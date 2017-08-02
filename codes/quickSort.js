var quickSort = function(arr) {
	helper(arr, 0, arr.length - 1);
}

var helper = function(arr, start, end) {
	if (!arr || start >= end) return;
	if (start < end) {
		var index = partition(arr, start, end);
		helper(arr, start, index - 1);
		helper(arr, index + 1, end);
	}

}

var partition = function(arr, start, end) {
	if (!arr || start < 0 || end >= arr.length || start > end) throw Error("invalid param!");

	var small = start - 1,
		index = Math.floor(Math.random() * (end - start + 1) + start);
	swap(arr, index, end);

	for (index = start; index < end; index++) {
		if (arr[index] < arr[end]) {
			small++;
			if (small != end)	swap(arr, small, index);
		}
	}
	++small;
	swap(arr, small, end);

	return small;

}
var swap = function(arr, i, j) {
	var tmp = arr[i];
	arr[i] = arr[j];
	arr[j] = tmp;
}