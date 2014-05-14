'use strict';

/* Services */

var wearItServices = angular.module('wearItServices', ['ngResource']);

wearItServices.factory('Item', [
    function() {
        return {
        	type: 'jeans',
        	leg: 32,
        	waist: 32,
        	color: 'blue'
        };
    }
]);

wearItServices.factory('Inventory', ['$resource',
  function($resource){
    return $resource('inventory/:type.json', {}, {get: {method:'GET', isArray:true},});
    // return $resource('inventory/:type.json', {}, {query: {method:'GET', params:{type:'inventory'}, isArray:true},});

  }]);