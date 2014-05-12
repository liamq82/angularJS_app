'use strict';

/* Services */

var wearItServices = angular.module('wearItServices', []);

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
