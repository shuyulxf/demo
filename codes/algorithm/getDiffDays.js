var getDiffDays = function(d1, d2) {
	if (!d1 || !d2) return -1;

	if (Object.prototype.toString.apply(d1).indexOf('Date') != -1 ) d1 = d1.getTime();
	else if (typeof d1 != 'number'){
		throw new TypeError('d1 argument type is error!');
	}

	if (Object.prototype.toString.apply(d2).indexOf('Date') != -1 ) d2 = d2.getTime();
	else if (typeof d2 != 'number'){
		throw new TypeError('d2 argument type is error!');
	}

	return Math.ceil(Math.abs(d1-d2)/(1000 * 3600 * 24));
}

console.log(getDiffDays(new Date("7/11/2015"), new Date("12/16/2016")))