(function () {
  'use strict';

	var cent, nickel, dime, quarter, halfDollar;
	var vendingMachine;

	beforeEach(function() {

		cent = new Coin();
		cent.weight = 0;
		cent.value = (.01).toFixed(2);

		nickel = new Coin();
		nickel.weight = 1;
		nickel.value = (.05).toFixed(2);

		dime = new Coin();
		dime.weight = 2;
		dime.value = (.1).toFixed(2);

		quarter = new Coin();
		quarter.weight = 3;
		quarter.value = (.25).toFixed(2);

		halfDollar = new Coin();
		halfDollar.weight = 4;
		halfDollar.value = (.5).toFixed(2);

		vendingMachine = new VendingMachine();
	});

	// As a vendor
	// I want a vending machine that accepts coins
	// So that I can collect money from the customer
	describe('Accept Coins', function(){

		it('should accept a nickel as a valid coin when inserted', function () {
			vendingMachine.insertCoin(nickel);
			expect(vendingMachine.getTotal()).toBe(nickel.value);
		});

		it('should accept a dime as a valid coin when inserted', function(){
			vendingMachine.insertCoin(dime);
			expect(vendingMachine.getTotal()).toBe(dime.value);
		});

		it('should accept a quarter as a valid coin when inserted', function(){
			vendingMachine.insertCoin(quarter);
			expect(vendingMachine.getTotal()).toBe(quarter.value);
		});

		it('should not accept a cent', function () {
			vendingMachine.insertCoin(cent);
			expect(vendingMachine.getTotal()).toBe((0).toFixed(2));
			expect(vendingMachine.checkCoinReturn()).toBe(cent);
		});

		it('should not accept a half dollar', function () {
			vendingMachine.insertCoin(halfDollar);
			expect(vendingMachine.getTotal()).toBe((0).toFixed(2));
			expect(vendingMachine.checkCoinReturn()).toBe(halfDollar);
		});

	});

	// As a vendor
	// I want customers to select products
	// So that I can give them an incentive to put money in the machine
	describe('Select Product', function(){

		it('should check for enough money', function () {
			vendingMachine.insertCoin(quarter);
			vendingMachine.insertCoin(quarter);
			vendingMachine.insertCoin(quarter);
			expect(vendingMachine.getTotal()).toBe((0.75).toFixed(2));
			vendingMachine.makeSelection('cola');
			expect(vendingMachine.getStatus()).toBe("PRICE $1.00");
			vendingMachine.insertCoin(quarter);
			expect(vendingMachine.getTotal()).toBe((1.00).toFixed(2));
			vendingMachine.makeSelection('cola');
			expect(vendingMachine.getStatus()).toBe("THANK YOU");
			expect(vendingMachine.getStatus()).toBe("INSERT COIN");
			expect(vendingMachine.getTotal()).toBe((0).toFixed(2));
		});

	});

	// As a vendor
	// I want customers to receive correct change
	// So that they will use the vending machine again
	describe('Make Change', function(){

	});

	// As a customer
	// I want to have my money returned
	// So that I can change my mind about buying stuff from the vending machine
	describe('Return Coins', function(){

	});

	// As a customer
	// I want to be told when the item I have selected is not available
	// So that I can select another item
	describe('Sold Out', function(){

	});

	// As a customer
	// I want to be told when exact change is required
	// So that I can determine if I can buy something with the money I have before inserting it
	describe('Exact Change Only', function(){

	});
})();
