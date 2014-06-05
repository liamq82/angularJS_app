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
            }
        }
    ])
    .controller('SelectSizeController', ['$scope', 'Item',
        function($scope, Item) {
            $scope.item = Item;
        }
    ]).controller('InventoryController', ['$scope', 'Inventory', 'ItemResource',
        function($scope, Inventory, ItemResource) {

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
                console.log(item);
                item.$save();
                $scope.item = {};
            };

            $scope.deleteItem = function(id) {
                var itemId = id;
                ItemResource.delete({
                    id: itemId
                }, function(res) {
                    console.log(res);
                });

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
    ]).controller('LoginController', ['$scope', '$routeParams', 'LoginResource', '$location', 'ItemResource',
        function($scope, $routeParams, LoginResource, location, ItemResource) {
            $scope.loginButton = 'Login';
            $scope.username = '';
            $scope.password = '';
            $scope.item_type = '';
            $scope.authenticate = function(username, password) {
                var login = new LoginResource();
                login.username = username;
                login.password = password;
                login.$save(function(response) {
                    $scope.loginButton = response.message;
                    // location.path(response.url)
                });
            };

            $scope.getItem = function(item_id) {
                var itemId = '538715e2ccc534d814000001';
                ItemResource.query({
                    id: itemId
                }, function(res) {
                    if (res[0].type) {
                        $scope.item_type = res[0].type;
                    }
                    if (res[0].message) {
                        $scope.item_type = res[0].message;
                    }
                });
            };
        }
    ]).controller('AddUserController', ['$scope', '$routeParams', 'AddUserResource', 'UsersResource',
        function($scope, $routeParams, AddUserResource, UsersResource) {
            $scope.username = '';
            $scope.password = '';
            $scope.addUser = function(username, password) {
                var addUser = new AddUserResource();
                addUser.username = username;
                addUser.password = password;
                addUser.$save();
            };
            $scope.user = {};

            $scope.users = UsersResource.query(function() {
                var users = [];
                angular.forEach($scope.users, function(user) {
                    this.push(user);
                }, users);
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
