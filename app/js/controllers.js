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

            console.log('selected item = ' + $scope.item.type);
        }
    ]);
