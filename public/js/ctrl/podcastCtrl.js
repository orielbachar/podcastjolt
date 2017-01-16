app.controller('podcastCtrl', ['$scope', 'recordingService', 'authService', function($scope, recordingService, authService){

  // $scope.isLoggedIn = authService.isLoggedIn;
  $scope.logOut = function(){
    authService.logOut();
}

  $scope.getAll = function (fromDate, toDate){
    recordingService.getAll(fromDate, toDate).then(function(){
      $scope.records = recordingService.playRecordings();
    });
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
    else{ console.log("done")};
  };


$scope.dates = function(fromDate, toDate){
  fromDate = new Date(fromDate).toString("yyyy-MM-dd");
  toDate = new Date(toDate).toString("yyyy-MM-dd");

  $scope.getAll(fromDate, toDate);

}

var d = new Date();
$scope.dates(d.setDate(d.getDate() - 1), new Date());

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
