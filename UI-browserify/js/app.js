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

    };

    $http.get(app.config.serverBaseUrl + "/playlist/played").then(
        function successCB(response) {
            $scope.playlists.played = response.data;
        },
        function errorCB(response) {
            console.error(response);
        }
    );

    $http.get(app.config.serverBaseUrl + "/playlist/upcoming").then(
        function successCB(response) {
            $scope.playlists.upcoming = response.data;
        },
        function errorCB(response) {
            console.error(response);
        }
    );

    $http.get(app.config.serverBaseUrl + "/playlist/current").then(
        function successCB(response) {
            $scope.current = response.data;
        },
        function errorCB(response) {
            console.error(response);
        }
    );

});