app.controller('AuthCtrl', ['$scope', '$state', 'authService', function($scope, $state, authService){
  $scope.user = {};

  $scope.register = function () {
    authService.register($scope.user).then(function(){
      $state.go('home');
    });

  };

  $scope.dropboxitemselected = function (team) {
      $scope.user.Group = team.name;
     }

  $scope.login = function(){
    authService.login($scope.user).then(function(){
      $state.go('home');
    });
  };

  $scope.user.Group = "Select Team...";

  authService.getGroups();
}])
