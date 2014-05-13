'use strict';

/* Services */

var wearItServices = angular.module('wearItServices', ['ngResource']);

wearItServices.factory('Item', [
    function() {
        return {
        	type: undefined,
        	leg: 32,
        	waist: 32,
        	color: 'blue'
        };
    }
]);

wearItServices.factory('Inventory', ['$resource',
  function($resource){
    return $resource('inventory/:type.json', {}, {
      query: {method:'GET', params:{type:'inventory'}, isArray:true},
    });
  }]);