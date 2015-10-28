angular.module('app.dummy.controllers', [
])

    .controller('DummyCtrl', function($scope, DummyIntegrationService) {

        $scope.data = {};

        DummyIntegrationService.getData().then(function(data) {
            $scope.data = data;
        });

    })

;