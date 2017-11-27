function FirstNotRepeatingChar(str)
{
    if (!str || str.length == 0) return -1;

    var len = str.length,
    	rlt = {};

    for(var i = 0; i < len; i++) {
    	var k = str[i];

    	if(rlt[k]) rlt[k]++;
    	else rlt[k] = 1;
    }

    for (var i = 0; i < len && rlt[str[i]] != 1; i++){}

    return i < len ? i : -1 ;
}

function deleteCharFromSecondStr(str1, str2) {
	if (!str1.length || str1.length == 0 || !str2 || str2.length == 0) return str1;

	var len1 = str1.length,
		len2 = str2.length;
	var map = {};
	for(var i = 0; i < len2; i++) {
		var k = str2[i];
		if (!map[k]) map[k] = 1;
	}

	var rlt = [];
	for (var i = 0; i < len1; i++) {
		var k = str1[i];
		if (!map[k]) rlt.push(k);
	}

	return rlt.join("");
}

function deleteDuplicateChars(str) {
	if (!str || str.length == 0) return str;

	var map = {},
		len = str.length,
		rlt = [];

	for (var i = 0; i < len; i++) {
		var k = str[i];
		if (!map[k]) {
			rlt.push(k);
			map[k] = 1;
		}
	}
	return rlt.join("");
}