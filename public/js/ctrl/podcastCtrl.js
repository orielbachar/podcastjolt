app.controller('podcastCtrl', ['$scope', 'authService', function($scope, authService){
  
  $scope.isLoggedIn = authService.isLoggedIn;
  $scope.logOut = authService.logOut;
  
  }
}]);