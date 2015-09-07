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
	var args = arguments,
		curryArgs = [];
	
	if (Object.prototype.toString.apply(fn) !== '[object Function]') {
		throw {
			name: 'TypeError',
			message: 'first arg must be function'
		};
	}
	
	for (var i = 1; i < args.length; i++) {
		curryArgs[i - 1] = args[i];
	}
	
	return function() {
		var argsArr = Array.prototype.slice.call(arguments, 0);
		
		curryArgs = curryArgs.concat(argsArr);
		return fn.apply(this, curryArgs);
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
	
	var memo;
	
	return function() {
		if (memo) {
			console.log('Get from memory');
			return memo;
		}
		
		memo = fn.apply(fn, arguments);
		return memo;
	};
}