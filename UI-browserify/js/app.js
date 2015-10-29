var angular = require('angular');


var app = angular.module('canooradio', []);

app.config = {
    serverBaseUrl:"/api"
};


app.controller('PlaylistController', function($scope, $http){

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

    var httpErrorCb = function (response) {
        console.error(response);
    }

    var successUserData = function (response) {

        $scope.user = response.data;
        console.log($scope.user);

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

    $http.get(app.config.serverBaseUrl + "/user/xxx")
        .then(successUserData, httpErrorCb);


    $scope.votedCss = function (song, indication) {

        var cssClass = '';

        if ($scope.user.votes.hasOwnProperty(song.id)) {
            if (indication > 0 && $scope.user.votes[song.id] > 0) {
                cssClass = 'voted';
            } else if (indication < 0 && $scope.user.votes[song.id] < 0) {
                cssClass = 'voted';
            }
        }

        return cssClass;
    }

    $scope.vote = function (song, indication) {
        $scope.user.votes[song.id] = indication;

        angular.forEach($scope.playlists.played, function (value, index) {

            if (song.id === value.id) {
               if (indication > 0) {
                   value.votes += 1;
               } else if (indication < 0) {
                   value.votes -= 1;
               }
           }
            
        });
    }

});
