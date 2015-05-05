'use strict';

angular.module('grocery')
.factory('Item', function($http, nodeUrl){

  function Item(){
  }

  Item.getAll = function(){
    return $http.get(nodeUrl + '/items');
  };

  Item.destroy = function(item){
    return $http.delete(nodeUrl + '/items/' + item._id);
  };

  Item.create = function(item){
    return $http.post(nodeUrl + '/items', item);
  };

  Item.update = function(item){
    return $http.put(nodeUrl + '/items', item);
  };

  return Item;
});
