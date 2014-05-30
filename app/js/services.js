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

wearItServices.factory('InventoryData', [
    function() {
        return {};
    }
]);

wearItServices.factory('Inventory', ['$resource',
    function($resource) {
        return $resource('http://localhost:8080/inventory/item');

    }
]);

wearItServices.factory('ItemResource', ['$resource',
    function($resource) {
        return $resource('http://localhost:8080/inventory/item/:id');
    }
]);