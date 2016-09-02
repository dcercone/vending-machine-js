function VendingMachine (){

	this.COINS = {
		NICKEL: {weight: 1, value: .05},
		DIME: {weight: 2, value: .10},
		QUARTER: {weight: 3, value: .25}
	};

	this.total = 0;
	this.coinReturn = 0;
}

VendingMachine.prototype = {

	setTotal: function(value){

		value = value || 0;

		if (value == 0){
			this.total = value;
		}
		else {
			this.total += value;
		}
	},
	getTotal: function(){
		return this.total.toFixed(2);
	},
	insertCoin: function(coin){

		if (!this.isValidCoin(coin)){
			this.returnCoin(coin);
			return coin;
		}

		var value = 0;

		switch(coin.weight){
			case this.COINS.NICKEL.weight:
			value = this.COINS.NICKEL.value;
			break;

			case this.COINS.DIME.weight:
			value = this.COINS.DIME.value;
			break;

			case this.COINS.QUARTER.weight:
			value = this.COINS.QUARTER.value;
			break;
		}

		this.setTotal(value);

	},
	isValidCoin: function(coin){

		if ((coin.weight >= this.COINS.NICKEL.weight ) &&
			(coin.weight <= this.COINS.QUARTER.weight)) {
			return true;
		}

		return false;
	},
	checkCoinReturn: function(){
		return this.coinReturn;
	},
	returnCoin: function(coin){
		this.coinReturn = coin;
	},
}