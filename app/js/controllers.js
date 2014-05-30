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

            $scope.inventory = Inventory.query(function() {
                var items = [];
                angular.forEach($scope.inventory, function(item) {
                    this.push(item);
                }, items);
                console.log(items);
            });

            $scope.addItem = function(stuff) {
                var data = new Inventory();
                data.type = 'wallet';
                data.$save();
/*                var data = {"type": "hat"};
                var postData = Inventory.save(data, function() {
                    console.log(postData);
                });*/
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
