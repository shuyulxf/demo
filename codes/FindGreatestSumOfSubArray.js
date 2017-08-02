//动态规划
function FindGreatestSumOfSubArray(array)
{
    if (!array || array.length === 0) return 0;

    var maxSum = -999999,
    	curSum = 0,
    	len = array.length;

    for (var i = 0; i < len; i++) {

    	if (curSum <= 0) curSum = array[i];
    	else {
    		curSum += array[i];
    	} 

    	maxSum = maxSum > curSum ? maxSum : curSum;
    }

    return maxSum;
}