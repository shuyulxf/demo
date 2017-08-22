
function MoreThanHalfNum_Solution1(numbers)
{
    if (!numbers || numbers.length === 0) return 0;
   
    var map = {},
        len = numbers.length,
        half = Math.ceil(len/2);
    for (var i = 0; i < len; i++) {
        var v = numbers[i];
        if (map[v]) map[v] = map[v]+1;
        else map[v] = 1;
    }
    
    for (var key in map) {
        if (map[key] >= half) return key - 0;
    }
    
    return 0;
}


function MoreThanHalfNum_Solution2(numbers)
{
    if (!numbers || numbers.length === 0) return 0;
   
    var v = numbers[0],
    	num = 1,
    	len = numbers.length;

    for (var i = 1; i < len; i++) {

    	if (num == 0) {
    		v = numbers[i];
    		num = 1;
    	} else if (v == numbers[i]) {
    		num++;
    	} else {
    		num--;
    	}
    }
	
    num = 0;
    for (var i = 0; i < len; i++) {
        if (v == numbers[i]) num++;
    }
    if (num >= Math.floor(len/2)+1) return v;

    return 0;
}
