angular.module('app.routings', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('default', {
                url: '/',
                templateUrl: 'app.tpl.html',
                controller: 'AppCtrl',
            })
        ;
    })
;

