function IsContinuous(numbers)
{
    if (!numbers || numbers.length != 5) return false;

    var len = numbers.length;

    var map = {"A":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"J":11,"Q":12,"K":13};
    var kn = 0;
    numbers = numbers.map(function(v){ var k = map[v]; if (v == 0) kn++; if (k) return k; else return v-0;}); 
    numbers.sort(function(a,b) {return a-b;});

    var init = -1;
    for (var i = kn; i < len; i++) {

    	var v = numbers[i];
    	if (init == -1) {
    		if (init == 0) return true; 
    		else init = v;
    	} else {
    		if (init + 1 == v) init += 1;
    		else if (kn > 0) {
    			kn--; init += 1;
    		}
    		else return false;
    	}
    }


    return init == numbers[len - 1] ? true : false;
}

