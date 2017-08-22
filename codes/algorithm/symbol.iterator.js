
/*
	* define a symbol.iterater function on arraylike object
*/

let al = {
	0: 1,
	1: 2,
	2: 3,
	length: 3,
	[Symbol.iterator]: Array.prototype[Symbol.iterator]
}
for(let i of al) console.log(i);

/*
	* two methods to define a symbol.iterater function on Object
	* 需要定义在函数的原型对象上
*/
let point = {
	x: 1,
	y: 3,
	[Symbol.iterator]: function() {
		return this;
	},
	next: function() {
		var value = this.x;
		if (value <= this.y) {
			this.x++;
			return {value:value, done: false};
		} else {
			return {value:value, done: true};
		}
	}
}
for(var i of point) console.log(i);

function Point(x,y) {
	this.x = x;
	this.y = y;
}
Point.prototype[Symbol.iterator] = function() {
	return this;
}
Point.prototype.next = function() {

	var value = this.x;
	if (value <= this.y) {
		this.x++;
		return {value:value, done: false};
	} else {
		return {value:value, done: true};
	}
}
var p = new Point(1,3);
for(var i of p) console.log(i);