var LinkNode = function(x) {
	this.v = x;
	this.next = null;
}

var isCircleInLink = function(head) {
	if (head == null || head.next == null) return false;

	var fast = head, 
	    slow = head;

	while (fast && fast.next) {
		fast = fast.next.next;
		slow = slow.next;
		if (fast == null || fast.next == null) return false;
		if (fast == slow) return true;
	}

}