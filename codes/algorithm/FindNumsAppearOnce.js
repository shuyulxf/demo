function FindNumsAppearOnce(array)
{
    if (!array || array.length == 0) return [undefined, undefined];

    var len = array.length;
	var eorRlt = 0;
	for(var i = 0; i < len; i++) {
		eorRlt ^= array[i];
	}

	var base = findFirst1Index(eorRlt);

	var rlt1 = 0, rlt2 = 0;
	for(var i = 0; i < len; i++) {
		var v = array[i];
		if (v & base) rlt1 ^= v;
		else rlt2 ^= v;
	} 

	return [rlt1^=0, rlt2^=0];
}

var findFirst1Index = function(n) {
	if (!n) return -1;

	var base = 1;
	while ((n & base) == 0) {
		base <<= 1;
	}

	return base;
}
