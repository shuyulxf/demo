var queue1 = new Array(),
    queue2 = new Array();

var push = function(element) {
	var len1 = queue1.length,
		len2 = queue2.length;

	if (len1) queue1.push(element);
	else if (len2) queue2.push(element);
	else if (len1 == 0 && len2 == 0) queue1.push(element);
	else throw new Error("runtime error");
}

var pop = function() {
	var len1 = queue1.length,
		len2 = queue2.length;

	if (len1 !== 0) {
		for (var i = 0; i <= len1 - 2; i++) {
			queue2.push(queue1.shift());
		}

		return queue1.shift();
	}

	if (len2 !== 0) {
		for (var i = 0; i <= len2 - 2; i++) {
			queue1.push(queue2.shift());
		}
		return queue2.shift();
	}

	throw new Error("runtime error");
}