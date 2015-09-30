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
	spec.esculant = spec.esculant || false;
	var that = product(spec);
	
	that.isEsculant = function() {
		return spec.esculant;
	};
	
	return that;
};

var esculantFish = function(spec) {
	spec.esculant = true;
	var that = fish(spec);
	return that;
};

var products = {
	'Rice': product({name: 'Rice', price: 5}),
	'Nori': product({name: 'Nori', price: 2}),
	'Sauce': product({name: 'Sauce', price: 3}),
	'Wasabi': product({name: 'Wasabi', price: 1}),
	'Fugu': fish({name: 'Fugu', price: 7}),
	'Salmon': esculantFish({name: 'Salmon', price: 5}),
	'Eel': esculantFish({name: 'Eel', price: 5})
};

var objSushi = function(spec) {
	spec.ingridients = [];
	spec.price = 0;
	
	var that = product(spec);
	
	that.getIngridients = function() {
		return spec.ingridients;
	};
	that.addIngridient = addIngridient = function(key) {
		var product = products[key];
		if (product) {
			if (product.isEsculant) {
				if (product.isEsculant()) {
					spec.ingridients.push(product);
				} else {
					alert('This is not esculant fish!');
				}
			} else {
				spec.ingridients.push(product);
			}
		}
	};
	that.clear = function() {
		spec.ingridients = [];
		spec.price = 0;
	};
	that.calculatePrice = calculatePrice = function() {
		var price = 0;
		_.each(spec.ingridients, function(el) {
			price += el.getPrice();
		});
		spec.price = price;
		return spec.price;
	};
		
	return that;
};

var sushi = objSushi({name: 'Test'}); 