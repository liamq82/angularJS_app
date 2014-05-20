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

        it('should add one item to the inventory table on submit', function() {
            element(by.model('item.type')).sendKeys('jeans');
            element(by.model('item.style')).sendKeys('tight');
            element(by.model('item.description')).sendKeys('tight fitting blue jeans');
            element(by.model('item.color')).sendKeys('blue');
            element(by.model('item.price')).sendKeys('25.99');
            element(by.model('item.quantity')).sendKeys('5');
            element(by.buttonText('Submit')).click();

            expect(element(by.css('.type')).getText()).toBe('jeans');
            expect(element(by.css('.style')).getText()).toBe('tight');
            expect(element(by.css('.description')).getText()).toBe('tight fitting blue jeans');
            expect(element(by.css('.color')).getText()).toBe('blue');
            expect(element(by.css('.price')).getText()).toBe('25.99');
            expect(element(by.css('.quantity')).getText()).toBe('5');
        });

        it('should add multiple items to the inventory table with multiple submits', function() {
            element(by.model('item.type')).sendKeys('jeans');
            element(by.model('item.style')).sendKeys('tight');
            element(by.model('item.description')).sendKeys('tight fitting blue jeans');
            element(by.model('item.color')).sendKeys('blue');
            element(by.model('item.price')).sendKeys('25.99');
            element(by.model('item.quantity')).sendKeys('5');
            element(by.buttonText('Submit')).click();

            element(by.model('item.type')).sendKeys('t-shirt');
            element(by.model('item.style')).sendKeys('loose');
            element(by.model('item.description')).sendKeys('loose fitting t-shirt');
            element(by.model('item.color')).sendKeys('red');
            element(by.model('item.price')).sendKeys('9.99');
            element(by.model('item.quantity')).sendKeys('10');
            element(by.buttonText('Submit')).click();

            element.all(by.css('.type')).then(function(items) {
                expect(items.length).toBe(2);
                expect(items[0].getText()).toBe('jeans');
                expect(items[1].getText()).toBe('t-shirt');
            });

            element.all(by.css('.style')).then(function(items) {
                expect(items.length).toBe(2);
                expect(items[0].getText()).toBe('tight');
                expect(items[1].getText()).toBe('loose');
            });

            element.all(by.css('.description')).then(function(items) {
                expect(items.length).toBe(2);
                expect(items[0].getText()).toBe('tight fitting blue jeans');
                expect(items[1].getText()).toBe('loose fitting t-shirt');
            });

            element.all(by.css('.color')).then(function(items) {
                expect(items.length).toBe(2);
                expect(items[0].getText()).toBe('blue');
                expect(items[1].getText()).toBe('red');
            });
            element.all(by.css('.price')).then(function(items) {
                expect(items.length).toBe(2);
                expect(items[0].getText()).toBe('25.99');
                expect(items[1].getText()).toBe('9.99');
            });
            element.all(by.css('.quantity')).then(function(items) {
                expect(items.length).toBe(2);
                expect(items[0].getText()).toBe('5');
                expect(items[1].getText()).toBe('10');
            });
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
