'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'ngRoute',
    'myApp.filters',
    'wearItServices',
    'myApp.directives',
    'myApp.controllers',
    'ui.bootstrap'
]).
config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/selectItem', {
            templateUrl: 'partials/selectItem.html',
            controller: 'SelectItemController'
        });
        $routeProvider.when('/selectSize', {
            templateUrl: 'partials/selectSize.html',
            controller: 'SelectSizeController'
        });
        $routeProvider.when('/inventory', {
            templateUrl: 'partials/inventory.html',
            controller: 'InventoryController'
        });
        $routeProvider.when('/inventory/:type', {
            templateUrl: 'partials/items.html',
            controller: 'ItemController'
        });
        $routeProvider.otherwise({
            redirectTo: '/inventory'
        });
    }
]);
