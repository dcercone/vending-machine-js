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


});