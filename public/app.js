(function (angular) {

  app = angular.module('EventLoggerApp', ['ui.router', 'restangular']);

  app.config(function($stateProvider, $urlRouterProvider, $httpProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
            .state('land', {
                url: "/",
                views: {
                    'mainView@': {
                        templateUrl: "/views/login.html",
                        controller: 'loginCtrl',
                        controllerAs: 'vm'
                    }
                }

            })
            .state('home', {
                url: "/home",
                views: {
                    'mainView@': {
                        templateUrl: "/views/home.html",
                        controller: 'homeCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('homelanding', {
                parent: 'home',
                views: {
                    'profileView@home': {
                        templateUrl: "/views/homeLanding.html",
                        controller: "applicaitonCtrl",
                        controllerAs: 'vm'
                    }
                }
            })
            .state('somepage', {
                parent: 'home',
                views: {
                    'profileView@home': {
                        templateUrl: "/views/somepage.html",
                        controller: "someCtrl"
                    }
                }
            })



  })
  .run(function(Restangular, $log, authentication) {
        Restangular.setDefaultHeaders({Authorization: 'Bearer '+ authentication.getToken()});
        Restangular.setBaseUrl("api");
        Restangular.setErrorInterceptor(function(response) {
            if (response.status === 500) {
                $log.info("internal server error");
                return true;
            }
            return true; // greska nije obradjena
        });
    });

})(angular);