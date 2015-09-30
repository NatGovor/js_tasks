if (typeof Object.create !== 'function') {
    Object.create = function(o) {
        var F = function() {};
        F.prototype = o;
        return new F();
    };
}

// Basic product
var product = {
	name: 'Product',
	price: 0,
	getName: function() {
		return this.name;
	},
	getPrice: function() {
		return this.price;
	}	
};
// end basic product

var rice = Object.create(product);
rice.name = 'Rice';
rice.price = 2;

var nori = Object.create(product);
nori.name = 'Nori';
nori.price = 2;

var sauce = Object.create(product);
sauce.name = 'Sauce';
sauce.price = 3;

var wasabi = Object.create(product);
wasabi.name = 'Wasabi';
wasabi.price = 1;

var fish = Object.create(product);
fish.esculant = false;
fish.isEsculant = function() {
	return this.esculant;
};

var fugu = Object.create(fish);
fugu.name = 'Fugu';
fugu.price = 7;

var salmon = Object.create(fish);
salmon.name = 'Salmon';
salmon.price = 5;
salmon.esculant = true;

var eel = Object.create(fish);
eel.name = 'Eel';
eel.price = 3;
eel.esculant = true;

var products = {
		'Rice': rice,
		'Nori': nori,
		'Sauce': sauce,
		'Wasabi': wasabi,
		'Fugu': fugu,
		'Salmon': salmon,
		'Eel': eel
	};

var sushi = {
	name: 'Test',
	ingridients: [],
	price: 0,
	getName: function() {
		return this.name;
	},
	getPrice: function() {
		return this.price;
	},
	getIngridients: function() {
		return this.ingridients;
	},
	addIngridient: function(key) {
		var product = products[key];
		if (product) {
			if (product.isEsculant) {
				if (product.isEsculant()) {
					this.ingridients.push(product);
				} else {
					alert('This is not esculant fish!');
				}
			} else {
				this.ingridients.push(product);
			}
		}
	},
	clear: function() {
		this.ingridients = [];
		this.price = 0;
	},
	calculatePrice: function() {
		var price = 0;
		_.each(this.ingridients, function(el) {
			price += el.getPrice();
		});
		this.price = price;
		return this.price;
	}
};