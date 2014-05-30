'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('SelectItemController', ['$scope', 'Item', 'TestAPI',
        function($scope, Item, TestAPI) {
            $scope.item = Item;
            $scope.item.type = 'jeans'
            $scope.testAPI = function() {
                console.log('http request about to start');
                $scope.testApiResponse = TestAPI.get({}, function() {
                    console.log('response ' + $scope.testApiResponse.message);
                });
                // console.log($scope.testApiResponse);
            }
        }
    ])
    .controller('SelectSizeController', ['$scope', 'Item',
        function($scope, Item) {
            $scope.item = Item;
        }
    ]).controller('InventoryController', ['$scope', 'Inventory',
        function($scope, Inventory) {

            $scope.item = {};

            $scope.inventory = Inventory.query(function() {
                var items = [];
                angular.forEach($scope.inventory, function(item) {
                    this.push(item);
                }, items);
            });

            $scope.addItem = function(stuff) {
                var item = new Inventory();
                item.type = $scope.item.type;
                item.color = $scope.item.color;
                item.style = $scope.item.style;
                item.price = $scope.item.price;
                item.description = $scope.item.description;
                item.quantity = $scope.item.quantity;
                item.$save();
                $scope.item = {};
            };

        }
    ]).controller('ItemController', ['$scope', '$routeParams', 'Inventory', 'Item',
        function($scope, $routeParams, Inventory, Item) {
            $scope.retrievedItems = Inventory.get({
                type: $routeParams.type
            }, function(items) {
                $scope.items = items;
                $scope.type = $routeParams.type;
            });
        }
    ]).controller('TestController', ['$scope', '$http', 'TestAPI',
        function($scope, $http, TestAPI) {
            $scope.executeRestCall = function() {
                var items = TestAPI.get(function() {
                    console.log(items);
                });
            };

            $scope.saveItem = function() {
                $scope.items = TestAPI.save();
                console.log($scope.items);
            };
        }
    ]);
