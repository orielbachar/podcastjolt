var app = angular.module('podcastApp', ['ui.router', 'ui.bootstrap']).run(function ($rootScope, $state, authService) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if (toState.authenticate && !authService.isLoggedIn()){
      // User isn’t authenticated
      $state.transitionTo("login");
      event.preventDefault(); 
    }
  });
});

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/templates/home.html',
      controller: 'podcastCtrl',
      authenticate: true
    })
    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: 'AuthCtrl',
      authenticate: false
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'AuthCtrl',
      authenticate: false
    })
    .state('settings', {
      url: '/settings',
      templateUrl: '/templates/settings.html',
      controller: 'podcastCtrl',
      authenticate: true
    })

  $urlRouterProvider.otherwise('login');
}]);
