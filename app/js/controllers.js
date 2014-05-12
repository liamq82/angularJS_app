'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('MyCtrl1', ['$scope', 'Item',
        function($scope, Item) {
            $scope.item = Item;
            $scope.selectTrousers = function() {
                $scope.item.type = 'trousers';
            };
        }
    ])
    .controller('MyCtrl2', ['$scope', 'Item',
        function($scope, Item) {
            $scope.item = Item;
            console.log('Select item controller....');
            console.log($scope.item);
        }
    ]).controller('InventoryController', ['$scope', 'Item', 'Inventory',
        function($scope, Item, Inventory) {
            $scope.inventory = Inventory.query();
            $scope.item = Item;
            console.log('Inventory controller...');
            console.log($scope.inventory);
        }
    ]);
