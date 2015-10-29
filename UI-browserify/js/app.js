var angular = require('angular');

var app = angular.module('canooradio', []);

app.config = {
    serverBaseUrl:"/api"
};

app.controller('PlaylistController', function($scope, $http){

    $http.get(app.config.serverBaseUrl + "/playlist").then(
        function successCB(response) {
            $scope.playlist = response;
        },
        function errorCB(response) {
            console.error(response);
        });

});