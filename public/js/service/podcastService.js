app.factory('recordings', ['$http' , 'authService', function($http, authService) {
  var recordingService = {
    recordings: [],

    getAll: function() {
        return $http.get('/recordings', {
          headers: {
           "Authorization": 'Bearer ' + authService.getToken()
       }
        }).then(function(data) {

          angular.copy(data.data, postService.recordings);
        });
      }
    };

    return recordingService
}]);


