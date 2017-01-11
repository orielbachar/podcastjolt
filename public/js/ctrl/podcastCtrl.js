app.controller('podcastCtrl', ['$scope', 'recordingService', function($scope, recordingService){

  // $scope.isLoggedIn = authService.isLoggedIn;
  // $scope.logOut = authService.logOut;


    recordingService.getAll();



  }
]);
