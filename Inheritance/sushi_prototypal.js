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
fish.name = 'Fugu';
fish.price = 7;
fish.esculant = false;
fish.isEsculant = function() {
	return this.esculant;
};

var salmon = Object.create(fish);
salmon.name = 'Salmon';
salmon.price = 5;
salmon.esculant = true;

var eel = Object.create(fish);
eel.name = 'Eel';
eel.price = 3;
eel.esculant = true;

var products = {
		'Rice': rice
	};