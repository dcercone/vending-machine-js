function VendingMachine (){

	this.COINS = {
		NICKEL: {weight: 1, value: 5},
		DIME: {weight: 2, value: 10},
		QUARTER: {weight: 3, value: 25}
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
			price: 100,
			quantity: 10
		},
		chips: {
			price: 50,
			quantity: 1
		},
		candy: {
			price: 65,
			quantity: 3
		}
	};

	this.total = 0;
	this.coinReturn = 0;
	this.selectionPrice = 0;
	this.insertedCoins = [];
	this.acceptedCoins = [this.COINS.NICKEL, this.COINS.DIME, this.COINS.QUARTER];
	this.bankedCoins = this.acceptedCoins.map(function(item){
		return {coin: item, count: 0};
	});
}

VendingMachine.prototype = {

	setTotal: function(){

		var total = 0;

		if (this.insertedCoins.length > 0){
			for(var coin in this.insertedCoins){
				total += (this.insertedCoins[coin].value * 100);
			}
		}

		this.total = total;
	},
	getTotal: function(){
		var value = this.total * .01;
		return value;
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
			currentStatus = currentStatus + " $" + this.getSelectionPrice().toPrecision(3);		
		}
		return currentStatus;
	},
	getSelectionPrice: function(){
		return this.selectionPrice * .01;
	},
	insertCoin: function(coin){

		if (!this.isValidCoin(coin)){
			this.coinReturn = (coin.value * 100);
			return coin;
		}

		this.insertedCoins.push(coin);
		this.setTotal();
		this.setStatus(this.getTotal());

	},
	isValidCoin: function(coin){

		if ((coin.weight >= this.COINS.NICKEL.weight ) &&
			(coin.weight <= this.COINS.QUARTER.weight)) {
			return true;
		}

		return false;
	},
	checkCoinReturn: function(){
		return this.coinReturn * .01;
	},
	returnCoins: function(){
		var coins = this.insertedCoins.slice();
		this.insertedCoins = [];
		this.setTotal();
		this.setStatus(this.STATES.INSERT);
		return coins;
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
					this.bankCoins();
				}
				else if (coinTotal > price){
					item.quantity--;
					this.coinReturn = (coinTotal - price);
					this.setStatus(this.STATES.THANKYOU);
					this.bankCoins();
				}
				else if (coinTotal < price){
					this.setStatus(this.STATES.PRICE);
					this.selectionPrice = price;
				}
			} else {

				this.setStatus(this.STATES.SOLD_OUT);

			}

		}
	},
	bankCoins: function(){
		for(var coin in this.insertedCoins){
			var coinIndex = this.acceptedCoins.indexOf(coin);
			if (coinIndex != -1){
				this.bankedCoins[coinIndex].count++;
			}
		}
		this.insertedCoins = [];
		this.setTotal();
	}
}