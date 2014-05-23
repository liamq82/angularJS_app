'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function() {
    beforeEach(module('myApp.controllers'));

    it('should create InventoryController', inject(function($controller) {
        //spec body
        var inventoryController = $controller('InventoryController', {
            $scope: {}
        });
        expect(inventoryController).toBeDefined();
    }));

    it('should create inventory array', inject(function($controller) {
        //spec body
        var scope = {};
        var inventoryController = $controller('InventoryController', {
            $scope: scope
        });
        expect(scope.inventory).toBeDefined();
    }));

    it('should add items to the inventory when addItem function is called.', inject(function($controller) {
        //spec body
        var scope = {};
        var inventoryController = $controller('InventoryController', {
            $scope: scope
        });
        var inventory = scope.inventory;
        var item = {
            type: 'coat',
            style: 'long',
            color: 'grey',
            description: 'long grey jacket',
            price: 85,
            quantity: 1
        };
        scope.addItem(item);

        expect(inventory.length).toEqual(1);
        expect(item).toEqual(inventory[0]);
    }));


});
