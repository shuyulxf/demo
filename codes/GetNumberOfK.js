function GetNumberOfK(data, k)
{
   	if (!data || data.length === 0) return 0;

   	var len = data.length,
   		left = 0,
   		right = len - 1;

   	while (left <= right) {

   		var mid = Math.floor((right - left) / 2) + left;
   		var mv = data[mid];

   		if (mv == k) {
   			var l1 = mid-1,
   				r1 = mid+1;
   			while (data[l1] == k && l1 >= left) l1--;
   			while (data[r1] == k && r1 <= right) r1++;
   			return r1 - l1 - 1;
   		} else if (mv > k) {
   			right = mid - 1;
   		} else {
   			left = mid + 1;
   		}
   	}

   	return -1;
}