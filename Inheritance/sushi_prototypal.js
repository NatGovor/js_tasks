if (typeof Object.create !== 'function') {
    Object.create = function(o) {
        var F = function() {};
        F.prototype = o;
        return new F();
    };
}

// Basic product
var basicProduct = {
	name: 'Basic Product',
	price: 0,
	getName: function() {
		return this.name;
	},
	getPrice: function() {
		return this.price;
	}	
};
// end basic product

var fish = Object.create(product);
fish.isEsculant = function() {
	return this.esculant;
};