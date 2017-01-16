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

      getAll: function(fromDate, toDate){
  //       return $http.get('/recordings', {
  //     headers: {
  //      "Authorization": 'Bearer ' + authService.getToken()
  //     }
  //  }).then(function(data){
        return $http.get('/recordings/' + fromDate + '/' + toDate).then(function(data){
          angular.copy(data.data, recordingService.recordings);
        });
      },

      playRecordings: function(){
        var recording = '';
            for (var i = 0; i < recordingService.recordings.length; i++) {
              recording = recordingService.recordings[i].link;
              recording = "api.twilio.com" + recording.replace('json', 'wav');
              recording = 'https://ACe175fbe84cb43b81742d9e9516c751af:fce5bbd7a29d1f57c19c4463b7694a03@' + recording;
              recordingService.recordings[i].link = recording;
            }
            return recordingService.recordings;
          }
        }
    return recordingService
}]);
