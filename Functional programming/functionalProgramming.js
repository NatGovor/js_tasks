// 1. Partial Application
function partial(fn) {
	if (Object.prototype.toString.apply(fn) !== '[object Function]') {
		throw {
			name: 'TypeError',
			message: 'first arg must be function'
		};
	}
	
	var slice = Array.prototype.slice,
		args = slice.call(arguments, 1);
		
	return function() {
		return fn.apply(this, args.concat(slice.call(arguments, 0)));
	}
}

// 2. Currying
function curry(fn) {
}

// 3. Linear Fold
function linearFold(array, callback, initialValue) {
	if (Object.prototype.toString.apply(array) !== '[object Array]') {
		throw {
			name: 'TypeError',
			message: 'first arg must be array'
		};
	}
	
	if (Object.prototype.toString.apply(callback) !== '[object Function]') {
		throw {
			name: 'TypeError',
			message: 'second arg must be function'
		};
	}
	
	var prevValue = initialValue || 0;;
	for (var i = 0; i < array.length; i++) {
		prevValue = callback(prevValue, array[i], i, array);
	}
	/*array.forEach(function(currValue, index, arr) {
		prevValue = callback(prevValue, currValue, index, arr);
	});*/
	
	return prevValue;
}

// 4. Linear Unfold
function linearUnfold(callback, initialValue) {
	if (Object.prototype.toString.apply(callback) !== '[object Function]') {
		throw {
			name: 'TypeError',
			message: 'second arg must be function'
		};
	}
	
	var currValue = callback(initialValue || 0),
		array = [];
	while (currValue) {
		array.push(currValue);
		currValue = callback(currValue);
	}
	
	return array;
}

// 5. Map
Array.prototype.customMap = function(callback) {
	if (Object.prototype.toString.apply(callback) !== '[object Function]') {
		throw {
			name: 'TypeError',
			message: 'second arg must be function'
		};
	}
	
	var newArray = [];
	this.forEach(function(item) {
		newArray.push(callback(item));
	});
	
	return newArray;
};

// 6. Filter
Array.prototype.customFilter = function(callback) {
	if (Object.prototype.toString.apply(callback) !== '[object Function]') {
		throw {
			name: 'TypeError',
			message: 'second arg must be function'
		};
	}
	
	var newArray = [];
	this.forEach(function(item) {
		if (callback(item)) {
			newArray.push(item);
		}
	});
	
	return newArray;
}

// 7. Average of even numbers