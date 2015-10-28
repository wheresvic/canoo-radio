angular.module('app', [
    'app.templates',
    'app.routings',
    'app.dummy'
])

    .controller('AppCtrl', function($scope, $locale) {
        $scope.date = Date.now();
        $scope.locale = $locale.id;
        $scope.items = [
            'Hello', 'Angular', 'App'
        ];
    })
;