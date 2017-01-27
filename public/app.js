(function () {

  app = angular.module('EventLoggerApp', ['ngRoute', 'ui.router']);

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
                        controller: "homeCtrl"
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



  });

})();