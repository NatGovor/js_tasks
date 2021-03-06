// Basic product
var Product = function(name, price) {
	this.name = name;
	this.price = price;
};
Product.prototype.getName = function() {
	return this.name;
};
Product.prototype.getPrice = function() {
	return this.price;
};
// end basic product

var Fish = function (name, price) {
	this.name = name;
	this.price = price;
};
Fish.prototype = new Product();
Fish.prototype.isEsculant = function() {
	return this.esculant;
};

var EsculantFish = function(name, price) {
	this.name = name;
	this.price = price;
	this.esculant = true;
}
EsculantFish.prototype = new Fish();

// Other products
var Rice = function(name, price) {
	this.name = name;
	this.price = price;
};
Rice.prototype = new Product();

var Nori = function(name, price) {
	this.name = name;
	this.price = price;
};
Nori.prototype = new Product();

var Sauce = function(name, price) {
	this.name = name;
	this.price = price;
};
Sauce.prototype = new Product();

var Wasabi = function(name, price) {
	this.name = name;
	this.price = price;
};
Wasabi.prototype = new Product();
// end Other products


var products = {
		'Salmon': new EsculantFish('Salmon', 5),
		'Eel': new EsculantFish('Eel', 3),
		'Fugu': new Fish('Fugu', 7),
		'Rice': new Rice('Rice', 2),
		'Nori': new Nori('Nori', 2),
		'Sauce': new Sauce('Sauce', 3),
		'Wasabi': new Wasabi('Wasabi', 1),
	};

var Sushi = function(name) {
	this.name = name;
	this.ingridients = [];
	this.price = 0;
};
Sushi.prototype = new Product();
Sushi.prototype.getIngridients = function() {
	return this.ingridients;
};
Sushi.prototype.addIngridient = function(key) {
	var product = products[key];
	if (product) {
		if (product instanceof Fish) {
			if (product.isEsculant()) {
				this.ingridients.push(product);
			} else {
				alert('This is not esculant fish!');
			}
		} else {
			this.ingridients.push(product);
		}
	}
};
Sushi.prototype.clear = function() {
	this.ingridients = [];
	this.price = 0;
};
Sushi.prototype.calculatePrice = function() {
	var price = 0;
	_.each(this.ingridients, function(el) {
		price += el.getPrice();
	});
	this.price = price;
	return this.price;
};

var sushi = new Sushi('test');
