var angular = require('angular');


var app = angular.module('canooradio', []);

app.config = {
    serverBaseUrl:"/api"
};


app.controller('PlaylistController', function($scope, $http, $interval){

    $scope.playlists = {
        upcoming: [],
        played: []
    };

    $scope.current = {
        artist: '',
        song: '',
        votes: 0,
        id: 'id'
    };

    $scope.user = {
        votes: {

        }
    };

    $scope.music = [];

    var httpErrorCb = function (response) {
        console.error(response);
    };

    var pollPlaylists = function () {

        $http.get(app.config.serverBaseUrl + "/playlist/played")
            .then(
            function successCB(response) {
                $scope.playlists.played = response.data;
            },
            httpErrorCb
        );

        $http.get(app.config.serverBaseUrl + "/playlist/upcoming")
            .then(
            function successCB(response) {
                $scope.playlists.upcoming = response.data;
            },
            httpErrorCb
        );

        $http.get(app.config.serverBaseUrl + "/playlist/current")
            .then(
            function successCB(response) {
                $scope.current = response.data;
            },
            httpErrorCb
        );
    };

    var getMusic = function (pageNumber) {

    }

    var successUserData = function (response) {

        $scope.user = response.data;
        console.log($scope.user);

        pollPlaylists();
        $interval(pollPlaylists, 5000);
    };


    $http.get(app.config.serverBaseUrl + "/user/xxx")
        .then(successUserData, httpErrorCb);



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
    }

    /**
     * TODO: sync up with the backend
     *
     * @param song
     * @param indication
     */
    $scope.vote = function (song, indication) {

        var previousVote = 0;

        if ($scope.user.votes.hasOwnProperty(song.id)) {
            previousVote = $scope.user.votes[song.id];
        }

        if (previousVote === indication) {
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
    }

});
