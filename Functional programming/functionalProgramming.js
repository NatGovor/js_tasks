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
function curry(fn, n) {
	var needArgsCount = n,
		slice = Array.prototype.slice,
		args = slice.call(arguments, 0);
	
	if (n === arguments.length - 2) {
		return fn.apply(this, slice.call(args, 2));
	} else {
		return function() {
			return curry.apply(this, args.concat(slice.call(arguments, 0)));
		}
	}
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
	// second variant
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
			message: 'first arg must be function'
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
			message: 'first arg must be function'
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
			message: 'first arg must be function'
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
function findAverageOfEven(array) {
	if (Object.prototype.toString.apply(array) !== '[object Array]') {
		throw {
			name: 'TypeError',
			message: 'first arg must be array'
		};
	}
	
	var isEven = function(value) {
			return value % 2 === 0;
		},
		getSum = function(prev, curr) {
			return prev + curr;
		};
	
	var filterArray = array.customFilter(isEven);
	return linearFold(filterArray, getSum) / filterArray.length;
}

// 8. Sum of random numbers
function sumOfRandom(count) {
	var genCount = 0,
		getRand = function() {
			if (genCount === count) {
				return;
			}
			
			genCount++;
			return Math.random() * 10;
		},
		getSum = function(prev, curr) {
			return prev + curr;
		};
		
	return linearFold(linearUnfold(getRand), getSum);
}

// 9. First
Array.prototype.customFirst = function(cond) {
	if (Object.prototype.toString.apply(cond) !== '[object Function]') {
		throw {
			name: 'TypeError',
			message: 'first arg must be function'
		};
	}
	
	for (var i=0; i < this.length; i++) {
		if (cond(this[i])) {
			return this[i];
		}
	}
	return;
	
	// second variant
	//return this.customFilter(cond).shift();
}

// 10. Lazy evaluation
function lazy(fn) {
	if (Object.prototype.toString.apply(fn) !== '[object Function]') {
		throw {
			name: 'TypeError',
			message: 'first arg must be function'
		};
	}
	
	//return partial.apply(this, arguments);
	
	// second variant
	return fn.bind.apply(fn, arguments);
}

// 11. Memoization
function memoizer(fn) {
	if (Object.prototype.toString.apply(fn) !== '[object Function]') {
		throw {
			name: 'TypeError',
			message: 'first arg must be function'
		};
	}
	
	var HashCode = function() {
		var serialize = function(obj) {
			var serializedCode = '',
				type = typeof obj;
			
			if (type === 'object') {
				for (var prop in obj) {
					serializedCode += '[' + type + ':' + prop + serialize(obj[prop]) + ']';
				}
			} else if (type === 'function') {
				serializedCode += '[' + type + ':' + obj.toString() + ']';
			} else {
				serializedCode = '[' + type + ':' + obj + ']';
			}
			
			return serializedCode.replace(/\s/g, '');
		};
		
		return {
			value: function(obj) {
				return serialize(obj);
			}
		}
	};
	
	var memo = {},	
		hashCoder = HashCode();

	return function() {
		var hash = hashCoder.value(arguments);
		
		if (memo[hash]) {
			console.log('Get from memory');
			return memo[hash];
		}
		
		memo[hash] = fn.apply(fn, arguments);
		return memo[hash];
	};
}