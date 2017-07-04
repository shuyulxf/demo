/*
* 先计算数组的长度，计算出是正数第几个元素
*/
var FindKthToTail = function() {

	if (head == null) return head;
    if (k < 1) return null;
    
    var len = 0,
        p	= head;
    while (p) {
        len++;
        p = p.next;
    }
    
    var kth = len - k;
    if (kth < 0) return null;
    
   	var pre = head;
    for (var i = 0; i < kth; i++){
        pre = pre.next;
    }

    return pre;
}

/*
*	双指针
*/
var FindKthToTail1 = function(head, k) {

	if (head == null || k < 1) return null;

	var fast = head;
	while (k && fast) {
		k--;
		fast = fast.next;
	}

	if (k) return null;

	var slow = head;

	while (fast !== null && slow != null) {
		fast = fast.next;
		slow = slow.next;
	}

	return slow;
}
