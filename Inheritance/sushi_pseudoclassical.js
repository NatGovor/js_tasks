if (typeof Object.create !== 'function') {
	Object.create = function(o) {
		var F = function() {};
		F.prototype = o;
		return new F();
	};
}

// Basic product
var Product = function (name, price) {
	this.name = name;
	this.price = price;
};
Product.prototype.getName = function() {
	return this.name;
};
Product.prototype.getPrice = function() {
	return this.price;
};

var product = new Product('', 12);