var app = angular.module('podcastApp', ['ui.router', 'ui.bootstrap']);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/templates/home.html',
      controller: 'podcastCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: 'AuthCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'AuthCtrl'
    })
    .state('settings', {
      url: '/settings',
      templateUrl: '/templates/settings.html',
      controller: 'podcastCtrl'
    })

  $urlRouterProvider.otherwise('login');
}]);
