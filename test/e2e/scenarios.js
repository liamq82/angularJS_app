'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('my app', function() {

    browser.get('index.html');

    it('should automatically redirect to /inventory when location hash/fragment is empty', function() {
        expect(browser.getLocationAbsUrl()).toMatch("/inventory");
    });


    describe('Inventory page', function() {

        beforeEach(function() {
            browser.get('index.html#/inventory');
        });


        it('should render inventory page when user navigates to /inventory', function() {
            expect(element.all(by.css('[ng-view] .jumbotron h1')).first().getText()).
            toMatch(/Inventory/);
        });

        it('should populate the item type in the InventoryController model on submit', function() {

        });

    });


    // describe('view2', function() {

    //   beforeEach(function() {
    //     browser.get('index.html#/view2');
    //   });


    //   it('should render view2 when user navigates to /view2', function() {
    //     expect(element.all(by.css('[ng-view] p')).first().getText()).
    //       toMatch(/partial for view 2/);
    //   });

    // });
});
