function GetUglyNumber_Solution(index)
{
    if (index < 1) return [];
    if (index == 1) return [1];

    var rlt = [1];

    var I2 = 0,
        I3 = 0,
        I5 = 0,
        next = 1;

    while (next < index) {

    	var cur = Math.min.apply(null, [rlt[I2]*2, rlt[I3]*3, rlt[I5]*5]);
    	rlt.push(cur);
    	while (rlt[I2]*2 <= cur) I2++;
    	while (rlt[I3]*3 <= cur) I3++;
    	while (rlt[I5]*5 <= cur) I5++;
    	next++;
    }

    return rlt[next-1];

}
