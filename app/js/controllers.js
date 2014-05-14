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
            $scope.itemType = $scope.item.type;
            console.log('select size controller says...');
            console.log($scope.item);
        }
    ]).controller('InventoryController', ['$scope', 'Inventory',
        function($scope, Inventory) {
            $scope.inventory = Inventory.query();
            // $scope.item = Item;
            console.log('Inventory controller showing inventory');
            console.log($scope.inventory);
        }
    ]).controller('ItemController', ['$scope', '$routeParams', 'Inventory', 'Item',
        function($scope, $routeParams, Inventory, Item) {
            $scope.item = Inventory.get({
                type: $routeParams.type
            }, function(inventory) {
                console.log('Item controller says...');
                console.log(inventory);
            });
        }
    ]);
