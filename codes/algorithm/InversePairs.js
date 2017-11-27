function InversePairs(data)
{
    if (!data || data.length == 0) return 0;
    var copy = [],
    	len = data.length;

    for (var i = 0; i < len; i++) {
    	copy.push(data[i]);
    }
    return helper(copy, data, 0, len - 1);
}

function helper(copy, data, left, right) {

	if (!data) return 0;

	var len = data.length;

	if (!len || right >= len || left < 0 || left > right) return 0;

	if (left == right) {
		copy[left] = data[right];
		return 0;
	}

	
	var mid = Math.floor((right - left)/2) + left;
	var lc = helper(copy, data, left, mid);
	var rc =  helper(copy, data, mid+1, right);

	var i = mid,
		j = right,
		index = right,
		c = 0;

	while (i >= left && j > mid) {
		if (data[i] > data[j]) {
			copy[index--] = data[i--];
			c += j - mid;
		}
		else {
			copy[index--] = data[j--];
		}
	}

	for (; i >= left; --i) {
		copy[index--] = data[i];
	}
	for (; j > mid; --j) {
		copy[index--] = data[j];
	}

	for (var m = left; m <= right; m++) {
		data[m] = copy[m];
	}
	
	return c + lc + rc;
	
}