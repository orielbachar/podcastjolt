app.controller('AuthCtrl', ['$scope', '$state', 'authService', function($scope, $state, authService){
  $scope.user = {};

  $scope.register = function () {
    auth.register($scope.user).then(function(){
      $state.go('home');
    });

  };

  $scope.login = function(){
    auth.login($scope.user).then(function(){
      $state.go('home');
    });
  };
}])
