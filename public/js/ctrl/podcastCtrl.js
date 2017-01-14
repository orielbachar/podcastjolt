app.controller('podcastCtrl', ['$scope', 'recordingService', function($scope, recordingService){

  // $scope.isLoggedIn = authService.isLoggedIn;
  // $scope.logOut = authService.logOut;

  $scope.getAll = function (){
    recordingService.getAll().then(function(){
          $scope.records = recordingService.playRecordings();
      })
    }
  $scope.playAll = function (i){
    if ($scope.records.length > i){
    var nextRecord = document.getElementById("record" + i.toString())
    nextRecord.play();
    i += 1;
    nextRecord.onended = function(){
      console.log("finished" + i.toString());
      $scope.playAll(i)
    };
  }
    else{ return "done"};
  };

    $scope.getAll();

  }
]);

// $scope.playAll = function (){
//   var nextRecord = document.getElementById("record0");
//   nextRecord.play();
//   for (var i = 0; i < $scope.records.length - 1; i++) {
//     nextRecord.onended = function(){
//     document.getElementById("record" + i.toString()).play();
//   }
//   }
// }
