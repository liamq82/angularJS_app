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


});
