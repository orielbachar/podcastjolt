app.controller('AuthCtrl', ['$scope', '$state', 'authService', function($scope, $state, authService){
  $scope.user = {};

  $scope.register = function () {
    authService.register($scope.user).then(function(){
      $state.go('home');
    });

  };

  $scope.login = function(){
    authService.login($scope.user).then(function(){
      $state.go('home');
    });
  };
}])
