var angular = require('angular');
var Chance = require('chance'),
    chance = new Chance();

var app = angular.module('canooradio', []);

app.config = {
    userId: '',
    url: "/api",
    serverBaseUrl: "http://localhost:8080"
};


app.controller('RadioController', function($scope, $http, $interval){

    $scope.searchInput = "";

    $scope.playlists = {
        upcoming: [],
        played: []
    };

    $scope.current = {
        artist: 'Artist',
        song: 'Song',
        votes: 0,
        id: 1
    };

    $scope.user = {
        votes: {

        }
    };

    $scope.music = [];

    $scope.searchKeyPress = function(keyEvent) {
        if (keyEvent.which === 13) {
            $scope.searchSongs($scope.searchInput);
        }
    };

    $scope.searchSongs = function (searchString, maxResults) {
        $http.get(app.config.url + "/search?q=" + searchString +"&maxResults=" + maxResults)
            .then(
            function successCB(response) {
                $scope.music = response.data;
            },
            httpErrorCb
        );
    };

    $scope.addToPlaylist = function (song) {
        $http.get(app.config.url + "/addSong?fileName=" + song.id)
            .then(
            function successCB(response) {
                $scope.playlists.upcoming.push(song);
            },
            httpErrorCb
        );
    };

    $scope.isNotQueued = function (songId) {
        var isNotQueued = true;
        angular.forEach($scope.playlists.upcoming, function (value, index) {
            if (songId === value.id) {
                isNotQueued = false;
            }
        });
        return isNotQueued;
    };

    $scope.votedCss = function (song, indication) {

        var cssClass = 'vote';

        if ($scope.user.votes.hasOwnProperty(song.id)) {
            if (indication > 0 && $scope.user.votes[song.id] > 0) {
                cssClass = 'voted';
            } else if (indication < 0 && $scope.user.votes[song.id] < 0) {
                cssClass = 'voted';
            }
        }

        return cssClass;
    };

    /**
     * TODO: sync up with the backend
     *
     * @param song
     * @param indication
     */
    $scope.vote = function (song, indication) {

        if (!app.config.userId) {
            return;
        }

        var previousVote = 0;

        if ($scope.user.votes.hasOwnProperty(song.id)) {
            previousVote = $scope.user.votes[song.id];
        }

        if (previousVote === indication) {

            delete $scope.user.votes[song.id];

            angular.forEach($scope.playlists.played, function (value, index) {
                if (song.id === value.id) {
                    if (indication < 0) {
                        value.votes += 1;
                    } else if (indication > 0) {
                        value.votes -= 1;
                    }
                }
            });

            return;
        }

        $scope.user.votes[song.id] = indication;

        angular.forEach($scope.playlists.played, function (value, index) {

            if (song.id === value.id) {

                if (indication > 0) {

                    var increment = 1;

                    if (previousVote < 0) {
                        increment += 1;
                    }

                    value.votes += increment;

                } else if (indication < 0) {

                    var decrement = 1;

                    if (previousVote > 0) {
                        decrement += 1;
                    }

                    value.votes -= decrement;
                }
            }

        });
    };

    var httpErrorCb = function (response) {
        console.error(response);
    };

    var successUserData = function (response) {

        $scope.user = response.data;
        console.log($scope.user);

        igniteRadioData();
    };

    var igniteRadio = function () {
        if (app.config.userId) {
            $http.get(app.config.url + "/user/" + app.config.userId).then(successUserData, httpErrorCb);
        } else {
            igniteRadioData();
        }
    };

    var igniteRadioData = function () {

        pollPlaylists();
        $scope.searchSongs("", 25);

        $interval(pollPlaylists, 5000);

        /*
         setTimeout(function () {
         console.log($scope.playlists.played);
         }, 2000);

         $interval(function () {
         console.log($scope.user);
         }, 5000);
         */
    };

    var pollPlaylists = function () {

        $http.get(app.config.serverBaseUrl + "/playedSongs")
            .then(
            function successCB(response) {
                $scope.playlists.played = response.data;
            },
            httpErrorCb
        );

        $http.get(app.config.serverBaseUrl + "/upcomingSongs")
            .then(
            function successCB(response) {
                $scope.playlists.upcoming = response.data;
            },
            httpErrorCb
        );

        $http.get(app.config.serverBaseUrl + "/currentSong")
            .then(
            function successCB(response) {
                $scope.current = response.data;
            },
            httpErrorCb
        );
    };

    igniteRadio();

});

app.run(function () {

    if (typeof(Storage) !== "undefined") {
        // localStorage.removeItem('canooradio-userid');

        app.config.userId = localStorage.getItem('canooradio-userid');

        if (!app.config.userId) {
            app.config.userId = chance.string({pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', length: 8});
            localStorage.setItem('canooradio-userid', app.config.userId);
        }

        console.log('Hello ' + app.config.userId);

    } else {
        alert('Sorry no localstorage support, voting will be disabled');
    }
});
