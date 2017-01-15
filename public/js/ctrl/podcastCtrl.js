app.controller('podcastCtrl', ['$scope', 'recordingService', 'authService', function($scope, recordingService, authService){

  // $scope.isLoggedIn = authService.isLoggedIn;
  $scope.logOut = authService.logOut;

  $scope.getAll = function (){
    recordingService.getAll().then(function(){
      $scope.records = recordingService.playRecordings();
    });
    }
    
  $scope.playAll = function (i){
    if ($scope.records.length > i){
    var nextRecord = document.getElementById("record" + i.toString())
    nextRecord.play();
    nextRecord.pause();
    nextRecord.play();
    i += 1;
    nextRecord.onended = function(){
      console.log("finished" + i.toString());
      $scope.playAll(i)
    };
  }
    else{ console.log("done")};
  };

    $scope.getAll();

  }
]);
