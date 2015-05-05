'use strict';

angular.module('grocery')
.controller('ListCtrl', function($scope,$window, Item){
  $scope.editing = false;

  if(!$scope.item){
    $scope.item = {};
  }

  Item.getAll().then(function(response){
    $scope.items = response.data.items;
  });

  $scope.destroy = function(item){
    Item.destroy(item);
    $window._.remove($scope.items, function(i){
      return i._id === item._id;
    });
  };

  $scope.saveChanges = function(item){
    $scope.editing = false;
    Item.update(item);
    $scope.item = {};
  };

  $scope.makeChanges = function(item){
    $scope.item = item;
    $scope.editing = true;
    Item.update(item);
  };

  $scope.create = function(item){
    Item.create(item)
    .then(function(response){
      $scope.items.push(response.data);
    });
  };

  $scope.update = function(item){
    Item.update(item);
  };


  $scope.useCamera = function(){
    $scope.cameraOn = true;
    $window.Webcam.set({
      width: 430,
      height: 370
    });
    $window.Webcam.attach('#my_camera');
  };

  $scope.cameraOff = function(){
    $scope.cameraOn = false;
    $window.Webcam.reset();
  };

  $scope.takeSnapshot = function(){
    $window.Webcam.snap( function(dataUri) {
      document.getElementById('my_result').innerHTML = '<img src="'+dataUri+'"/>';
      $scope.item.photo = dataUri;
    });
  };
});
