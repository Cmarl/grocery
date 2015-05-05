'use strict';

angular.module('grocery')
.controller('NavCtrl', function($rootScope, $http, $window, $scope, $state, User){

  $scope.afAuth.$onAuth(function(data){
    if(data){
      $rootScope.activeUser = data;
      $rootScope.displayName = getDisplayName(data);
      $http.defaults.headers.common.Authorization = 'Bearer ' + data.token;
      User.findOrCreate()
      .then(function(){
        $state.go('home');
      })
      .catch(function(){
        $window.swal({title: 'User Creation Error', text: 'There was a problem creating a user. Please try again.', type: 'error'});
      });
    }else{
      $rootScope.activeUser = null;
      $rootScope.displayName = null;
      $http.defaults.headers.common.Authorization = null;
    }
    $state.go('home');
  });

  $scope.logout = function(){
    User.logout();
  };

  function getDisplayName(data){
    switch(data.provider){
      case 'password':
        console.info(data);
        return data.password.email;
      case 'twitter':
        console.info(data);
        return data.twitter.username;
      case 'github':
        console.info(data);
        return data.github.displayName;
      case 'google':
        console.info(data);
        return data.google.displayName;
      case 'facebook':
        return data.facebook.displayName;
      }
    }
});
