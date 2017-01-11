app.factory('recordingService', ['$http' , 'authService', function($http, authService) {
  var recordingService = {
    recordings: [],

    // getAll: function() {
    //     return $http.get('/recordings', {
    //       headers: {
    //        "Authorization": 'Bearer ' + authService.getToken()
    //    }
    //     }).then(function(data) {
    //
    //       angular.copy(data.data, postService.recordings);
    //     });
    //   }

      getAll: function(){
        return $http.get('/recordings').then(function(data){
          angular.copy(data.data, recordingService.recordings);
          recordingService.playRecordings();
        });
      },

      playRecordings: function(){
        for (var i = 0; i < recordingService.recordings.length; i++) {
          var recording = recordingService.recordings[i].link;
          recording = "api.twilio.com" + recording.replace('json', 'wav');
          getRecord(recording);
        }
         function getRecord (recording){
          return $http.get('https://{ACe175fbe84cb43b81742d9e9516c751af}:{fce5bbd7a29d1f57c19c4463b7694a03}@' + recording)
          .then(function(response){
            console.log(response);
        });
      }
    }


  }
    return recordingService
}]);
