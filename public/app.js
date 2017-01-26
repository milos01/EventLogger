(function () {

  app = angular.module('EventLoggerApp', ['ngRoute']);

  app.config(function($routeProvider, $locationProvider){
    $routeProvider
      .when('/', {
        templateUrl: '/views/home.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/profile', {
        templateUrl: '/views/profile.html',
        controller: 'profileCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});
  });
  
})();