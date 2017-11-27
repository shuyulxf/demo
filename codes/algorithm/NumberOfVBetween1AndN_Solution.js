//v is not 0
function NumberOfVBetween1AndN_Solution(n,v)
{
    if (n < 1) return 0;

    var k,
    	num = 0;

    for (var i = 1; k = Math.floor(n / i); i *= 10) {

    	num += Math.floor(k / 10) * i;

    	var cur = k % 10;
    	if (cur > v) {
    		num += i;
    	} else if(cur == v) {
    		num += n - k*i + 1;
    	}
    }

    return num;
}
function NumberOf0Between1AndN_Solution(n) {
	if (n < 1) return 0;

	var k,
	    num =0;

	for (var i = 1; Math.floor((k = Math.floor(n / i)) / 10); i *= 10) {
		num += Math.floor(k / 10) * i;

		var cur = k % 10;
		if (cur == 0) {
			num += n - k * i + 1 - i;
		}
	}

	return num;
}