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
            // $scope.items = [{}];
            /*$scope.items = [{
                type: 'jeans',
                leg: 32,
                waist: 32,
                color: 'blue'
            }, {
                type: 'jeans',
                leg: 28,
                waist: 28,
                color: 'blue'
            }];*/
            $scope.retrievedItems = Inventory.get({
                type: $routeParams.type
            }, function(items) {
/*                $scope.test= items[0].item1.type;
                $scope.items = items;
                console.log(items[0]);*/
            });
        }
    ]);
