app.factory('authService', ['$http', '$window', function($http, $window){

   var authService = {};

   authService.login = function(user){
     return $http.post('/login', user).then(function(data){
       authService.saveToken(data.data.token);
     });
   }
   authService.saveToken = function (token) {
     $window.localStorage['podcast-jwt'] = token;
   };

   authService.getToken = function (){
     return $window.localStorage['podcast-jwt'];
   }

   authService.register = function (user) {
     return $http.post('/register', user).then(function(data){
       authService.saveToken(data.data.token);
     })
   };

   authService.isLoggedIn = function(){
     var token = authService.getToken();

     if(token){
       return true;
     } else {
       return false;
     }
   };

   // authService.currentUser = function(){
   //   if(authService.isLoggedIn()){
   //     var token = authService.getToken();
   //     var arrToken = token.split('.');
   //     var payload = arrToken[1];
   //     var decodedToken = JSON.parse($window.atob(payload));

   //     return decodedToken.username;
   //   }
   // };

   authService.logOut = function(){
     $window.localStorage.removeItem('podcast-jwt');
   };

  return authService;
}]);
