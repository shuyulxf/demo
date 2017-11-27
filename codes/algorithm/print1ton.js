/*
*	数组
*	字符串是没有办法在s[i]处赋值的
*/
var print1ton1 = function(n) {
	if (n < 1) return;

	var number = new Array();

	while (isValid(number, n)) {
		console.log(number.join(''));
	}
}
var initStr = function(arr, n, char) {

	for (var i = 0; i < n; i++) arr.push(char);
}
var isValid = function(number, n) {
	var len 	= number.length,
		carry   = 1;

	for (var i = len - 1; i >= 0; i--) {
		var b = number[i],
			s = b + carry;

		number[i] = s % 10;
		carry = s > 9 ? 1 : 0;
	}

	if (len === n && carry === 1) return false;

	carry ? number.unshift(1) : undefined;

	return true;
}



