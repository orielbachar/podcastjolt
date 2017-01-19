app.controller('podcastCtrl', ['$scope', 'recordingService', 'authService', function($scope, recordingService, authService){

  // $scope.isLoggedIn = authService.isLoggedIn;
  $scope.logOut = function(){
    authService.logOut();
}

  $scope.getAll = function (fromDate, toDate, group){
    recordingService.getAll(fromDate, toDate, group).then(function(){
      $scope.records = recordingService.playRecordings();
    });
    }

  $scope.playAll = function (i){
    if ($scope.records.length > i){
    var nextRecord = document.getElementById("record" + i.toString())
    nextRecord.play();
    $scope.Played = true;
    i += 1;
    nextRecord.onended = function(){
      console.log("finished" + i.toString());
      $scope.playAll(i)
    };
  }
    else{ console.log("done")};
  };

$scope.toggleCalendar = function (){
  $scope.calendar = !$scope.calendar
}

$scope.dates = function(fromDate, toDate){
  $scope.currentDate = new Date(toDate).toString("dd-MM-yyyy");
  $scope.fromDate = new Date(fromDate).toString("yyyy-MM-dd");
  $scope.toDate = new Date(toDate).toString("yyyy-MM-dd");

  $scope.getAll($scope.fromDate, $scope.toDate, $scope.group.name);

}

$scope.splitDates = function (date){
  $scope.dates(date.setDate(date.getDate() - 1), date.setDate(date.getDate() + 1));
}

$scope.selectedGroup = function(index){
  $scope.group = authService.groups[index];
  $scope.getAll($scope.fromDate, $scope.toDate, $scope.group.name);
}

//defaults:
$scope.groups = authService.groups;
$scope.group = {name: "All"};
$scope.calendar = false;
$scope.splitDates(new Date());

    // <script>
    //   var loaded = false;
    //
    //   var playPause = function () {
    //     if (!loaded) {
    //       this.one('canplay', function () {
    //         loaded = true;
    //         this.play();
    //       }, this);
    //       this.load('/song.mp3');
    //     } else {
    //       this.playPause();
    //     }
    //   }
    //
    //   var audio5js = new Audio5js({
    //     swf_path: './flash/audio5js.swf',
    //     ready: function () {
    //       var btn = document.getElementById('play-pause');
    //       btn.addEventListener('click', playPause.bind(this), false);
    //     }
    //   });
    // 	audio5js.load();
    // 	audio.play();
    // </script>

  }
]);
