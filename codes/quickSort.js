var quickSort = function(arr) {
	sort(arr, 0, arr.length - 1);
}

var sort = function(arr, l, r) {
	
	if (l < r) {
		var partitionId = partition(arr, l, r);
		sort(arr, l, partitionId-1);
		sort(arr, partitionId + 1, r);
	}
}

var partition = function(arr, l , r) {
	var index,
	 	small = l-1;

	for (index = l; l <= r; index++) {
		if ()
	}
}