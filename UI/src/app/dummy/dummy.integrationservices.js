angular.module('app.dummy.integrationservices', [])

    .service('DummyIntegrationService', function($q, $http) {

        return {
            getData: function () {
                var dfd = $q.defer();

                $http.get('http://ip.jsontest.com/').success(function(data) {
                    dfd.resolve(data);
                });

                return dfd.promise;
            }
        };

    })

;