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
    ]).controller('InventoryController', ['$scope', 'Inventory',
        function($scope, Inventory) {
            $scope.items = Inventory.get();
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
