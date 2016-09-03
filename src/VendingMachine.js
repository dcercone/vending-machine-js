function VendingMachine (){

	this.COINS = {
		NICKEL: {weight: 1, value: .05},
		DIME: {weight: 2, value: .10},
		QUARTER: {weight: 3, value: .25}
	};

	this.STATES = {
		INSERT: 1,
		PRICE: 2,
		EXACT_CHANGE: 3,
		SOLD_OUT: 4,
		THANKYOU: 5
	};

	this.products = {
		cola: {
			price: 1.00,
			quantity: 10
		},
		chips: {
			price: 0.50,
			quantity: 1
		},
		candy: {
			price: 0.65,
			quantity: 3
		}
	};

	this.total = 0;
	this.coinReturn = 0;
	this.selectionPrice = 0;
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
	setStatus: function(status){

		if ((!status) && (this.total == 0)){
			status = this.STATES.INSERT;
		}

		switch (status) {
			case this.STATES.PRICE:
				if (this.status == this.STATES.PRICE){
					this.status = "INSERT COIN";
				}
				else {
					this.status = "PRICE";
				}
				break;

			case this.STATES.THANKYOU: 
				this.status = "THANK YOU";
				break;

			case this.STATES.INSERT:
				if (this.total == 0){
					this.status = "INSERT COIN";
				}
				else {
					this.status = this.getTotal();
				}
				break;

			case this.STATES.SOLD_OUT:
				this.status = "SOLD OUT";
				break;

			default:
				this.status = this.getTotal();
				break;
		}


	},
	getStatus: function(){
		currentStatus = this.status;
		this.setStatus(this.STATES.INSERT);
		if (currentStatus == "PRICE"){
			currentStatus = currentStatus + " $" + this.getSelectionPrice();		
		}
		return currentStatus;
	},
	getSelectionPrice: function(){
		return this.selectionPrice.toFixed(2);
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
	makeSelection: function(selection){
		if (selection){

			var item = this.products[selection];

			if (item.quantity > 0){

				var coinTotal = this.total;
				var price = item.price;

				if (coinTotal == price){
					item.quantity--;
					this.setStatus(this.STATES.THANKYOU);
					this.setTotal(0);
				}
				else if (coinTotal > price){
					item.quantity--;
					this.coinReturn = coinTotal - price;
					this.setTotal(0);
				}
				else if (coinTotal < price){
					this.setStatus(this.STATES.PRICE);
					this.selectionPrice = price;
				}
			} else {

				this.setStatus(this.STATES.SOLD_OUT);

			}

		}
	}
}