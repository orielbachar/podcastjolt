app.factory('authService', ['$http', '$window', function($http, $window){

   var auth = {};

   auth.login = function(user){
     return $http.post('/login', user).then(function(data){
       auth.saveToken(data.data.token);
     });
   }
   auth.saveToken = function (token) {
     $window.localStorage['rereddit-jwt'] = token;
   };

   auth.getToken = function (){
     return $window.localStorage['rereddit-jwt'];
   }

   auth.register = function (user) {
     return $http.post('/register', user).then(function(data){
       auth.saveToken(data.data.token);
     })
   };

   auth.isLoggedIn = function(){
     var token = auth.getToken();

     if(token){
       return true;
     } else {
       return false;
     }
   };

   auth.currentUser = function(){
     if(auth.isLoggedIn()){
       var token = auth.getToken();
       var arrToken = token.split('.');
       var payload = arrToken[1];
       var decodedToken = JSON.parse($window.atob(payload));

       return decodedToken.username;
     }
   };

   auth.logOut = function(){
     $window.localStorage.removeItem('rereddit-jwt');
   };

  return auth;
}]);
