app.controller('podcastCtrl', ['$scope', 'recordingService', 'authService', function($scope, recordingService, authService){

  // $scope.isLoggedIn = authService.isLoggedIn;
  $scope.logOut = authService.logOut;

  var playingFunc = function (scope, index, links) {
  	var aud = document.getElementById("playbar");
  	scope.record = links[index-1];
  	setTimeout(function(){
  		if (links.length >= index){
  			aud.src = links[index];
  			aud.play();
  			scope.recordName = links[index];
  			aud.onended = function() {
  			  index++;
  			  // scope.record = links[index-1];
  			  // aud.play();

  			  playingFunc(scope, index, links);  
  			};
  		}
  	}, 0);
  	// if (links.length >= index){
  	// 	let aud = document.getElementById("playbar");
  	// 	aud.onended = function() {
  	// 	  index++;
  	// 	  scope.record = links[index-1];
  	// 	  // aud.play();

  	// 	  playingFunc(scope, index, links);  
  	// 	};
  	// 	return;
  	// }
  };
  $scope.getAll = function (){
    recordingService.getAll().then(function(){

          $scope.records = recordingService.playRecordings();

          records = recordingService.playRecordings();
          if (records.length > 0){
          	let i = 1;
         	// $scope.record = records[i-1];
          	playingFunc($scope, i, records);  		
          	
			          	 	
          }

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
