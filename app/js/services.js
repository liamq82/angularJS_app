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
        return $resource('http://localhost:8080/inventory/item', {}, {
            headers: {
                // 'Access-Control-Allow-Origin': '*'
            }
        }, {
            get: {
                method: 'GET',
                isArray: true
            },
        });

    }
]);

wearItServices.factory('TestAPI', ['$resource',
    function($resource) {
        return $resource('http://localhost:8080/inventory/item', {}, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }, {
            get: {
                method: 'GET',
                isArray: true
            },
            save: {
                method: 'POST'
            },
            test: {
                method: 'POST',
                headers: {
                    "Access-Control-Allow-Origin": true
                }
            }
        });

    }
]);
