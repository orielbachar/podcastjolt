var app = angular.module('podcastApp', ['ui.router']);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/templates/home.html',
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

  $urlRouterProvider.otherwise('home');
}]);
