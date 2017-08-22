function FindNumbersWithSum(array, sum)
{
    if (!array || array.length === 0) return [];

    var len = array.length,
    	rlt = null,
    	left = 0,
    	right = len - 1,
    	min = -99999;

    while (left < right) {

    	var lv = array[left],
    		rv = array[right];

    	if (lv + rv === sum) {
    		min = lv * rv;
    		rlt = [lv, rv];
    	} if (lv + rv < sum) {
    		left++;
    	} else {
    		right--;
    	}
    }

    return rlt;

}