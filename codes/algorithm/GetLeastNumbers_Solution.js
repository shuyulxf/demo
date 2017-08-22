function GetLeastNumbers_Solution(input, k)
{
    if (!input || input.length == 0 || input.length < k) return [];

    var len = input.length,
    	index = partition(input, 0, len - 1),
    	start = 0,
    	end = len - 1;

    while (index != k - 1) {
    	
    	if (index > k - 1) {
    		end = index - 1;
    		index = partition(input, start, end);
    	} else {
    		start = index + 1;
    		index = partition(input, start, end);
    	}
    }

    var rlt = [];
    for (var i = 0; i < k; i++) rlt.push(input[i]);

    return rlt;
}

function partition(arr, start, end) {
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
function swap(arr, i, j) {
	var tmp = arr[i];
	arr[i] = arr[j];
	arr[j] = tmp;
}