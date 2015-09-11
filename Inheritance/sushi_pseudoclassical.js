if (typeof Object.create !== 'function') {
	Object.create = function(o) {
		var F = function() {};
		F.prototype = o;
		return new F();
	};
}

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

var product = new Product('', 12);
var fish = new Fish('test', 10);
var esfish = new EsculantFish('test', 10);