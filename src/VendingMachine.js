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
	this.setStatus();
}

VendingMachine.prototype = {

	setTotal: function(){

		var total = 0;

		if (this.insertedCoins.length > 0){
			for(var coin in this.insertedCoins){
				total += this.insertedCoins[coin].value;
			}
		}

		this.total = total;
	},
	getTotal: function(){
		return this.convertCoinValue(this.total);
	},
	setStatus: function(status){

		if ((!status) && (this.total == 0)){
			status = this.STATES.INSERT;
		}

		// if (!this.hasBankedCoins()) {
		// 	status = this.STATES.EXACT_CHANGE;
		// }

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

			// case this.STATES.EXACT_CHANGE:
			// 	this.status = "EXACT CHANGE ONLY";
			// 	break;

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
	
		return this.convertCoinValue(this.selectionPrice);
	},
	insertCoin: function(coin){

		if (!this.isValidCoin(coin)){
			this.coinReturn = coin;
			return coin;
		}

		var insertedCoin = new Coin(coin.weight);
		insertedCoin.value = coin.value;
		insertedCoin.value = this.convertCoinValue(insertedCoin.value);
		this.insertedCoins.push(insertedCoin);
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
	convertCoinValue: function(value){

		if (value) {

			if (value % 1 == 0){
				value = value * .01;
			}
			else {
				value = value * 100;
			}

			return value;
		}

		return 0;

	},
	checkCoinReturn: function(){
		return this.coinReturn.value;
	},
	returnCoins: function(){

		for(var index in this.insertedCoins){
			var coin = this.insertedCoins[index];
			coin.value = this.convertCoinValue(coin.value);
		}

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
			var coinIndex = this.arrayIndexOfCoin(this.acceptedCoins, this.insertedCoins[coin].value, "value");
		
			if (coinIndex != -1){
				this.bankedCoins[coinIndex].count++;
			
			}
		}
		this.insertedCoins = [];
		this.setTotal();
	},
	hasBankedCoins: function(){

		var coinCount = 0;
		for(var coin in this.bankedCoins){
			coinCount += this.bankedCoins[coin].count;
		}

		if (coinCount > 0){
		
		}

	
		return false;
	},
	makeChange: function(){

		// get the total coins entered by the user
		var amountInput = this.getTotal();
	

		// get the amount of the item purchased
	


	},
	arrayIndexOfCoin: function(array, searchTerm, property){
	
		for(var index in array){
		
			if (array[index][property] === searchTerm) return index;
		}

		return -1;
	}
}