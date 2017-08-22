/*
* 数组中只有基本类型
* 如果是object和array等复杂类型的数据应该去重么？如何去重？
*/
var deleteDup = function(arr) {
	if (!arr || !Array.isArray(arr) || arr.length === 0) return arr;

	var rst = [],
		temp = {},
		len = arr.length;

	for (var i = 0; i < len; i++) {
		var v = arr[i],
			name = v + typeof v;

		if (!temp[name]) {
			temp[name] = 1;
			rst.push(v);
		}
	}

	return rst;
}

