'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('SelectItemController', ['$scope', 'Item',
        function($scope, Item) {
            $scope.item = Item;
            $scope.item.type = 'jeans'
        }
    ])
    .controller('SelectSizeController', ['$scope', 'Item',
        function($scope, Item) {
            $scope.item = Item;
        }
    ]).controller('InventoryController', ['$scope',
        function($scope) {

            $scope.inventory = [];

            $scope.addItem = function(stuff) {
                $scope.myCopy = angular.copy(stuff);
                $scope.item = {};
                $scope.inventory.push($scope.myCopy);
                return $scope.myCopy;
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
    ]);
