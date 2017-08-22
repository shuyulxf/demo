/*
*	不要求奇数偶数的相对位置不变,
*	优化：将判断条件抽出来，可以替换的位置要改为函数形式
*   如何是链表的话，可以采取的方法：将遇到的偶数放到链表的尾部
*/
function reOrderArray(array)
{
    if (!array || array.length === 0) return array;
    
    var len  = array.length - 1,
    	high = len,
        low  = 0;
    
    while (low < high) {
        while (array[low] & 0x1) low++;
        while (!(array[high] & 0x1)) high--; 
        if (low < len && high > low)	swap(array, low, high);
        low++;
        high--;
    }
    return array;
}
var swap = function(array, x, y) {
    var tmp = array[y];
    array[y] = array[x];
    array[x] = tmp;
}