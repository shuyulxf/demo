var partition = function(arr, start, end) {
	if (!arr || start < 0 || end >= arr.length || start > end) throw Error("invalid param!");

	var small = start - 1,
		index = Math.floor(Math.random() * (end - start + 1) + start);
	swap(arr, index, end);

	for (index = start; index < end; i++) {
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