function PrintMinNumber(numbers)
{
    numbers.sort(sortFunc);

    return numbers.join("") - 0;
}

function sortFunc(x, y) {
	x += '',
	y += '';

	return x + y > y + x ? true : false;
}