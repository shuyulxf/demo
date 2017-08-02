function FindContinuousSequence(sum)
{
    if (sum < 3) return [];

    var rlt =[],
    	left = 1,
    	right = 2;
    var mid = Math.ceil(sum/2);
    var t = left,
    	tmp = [left];

    while (right <= mid) {

    	tmp.push(right);
    	if (t + right < sum) {
    		t += right++;
    	}
    	else {
    		if (t + right == sum) rlt.push(tmp);
			left++;
    		right = left + 1;
    		t = left;
    		tmp = [left];
    	}
    }

    return rlt;
}