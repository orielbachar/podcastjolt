app.controller('podcastCtrl', ['$scope', 'recordingService', function($scope, recordingService){

  // $scope.isLoggedIn = authService.isLoggedIn;
  // $scope.logOut = authService.logOut;

  $scope.getAll = function (){
    recordingService.getAll().then(function(){
      $scope.record = recordingService.playRecordings()
    })
  };
  }
]);
