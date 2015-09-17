var product = function(spec) {
	var that = {};
	
	that.getName = function() {
		return spec.name;
	};
	
	that.getPrice = function() {
		return spec.price;
	};
	
	return that;
};

var fish = function(spec) {
	var that = product(spec);
	
	that.isEsculant = function() {
		return that.esculant;
	};
	
	return that;
};

var esculantFish = function(spec) {
	spec.esculant = true;
	var that = fish(spec);
	return that;
};