var LinkNode = function(x) {
	this.v = x;
	this.next = null;
}
var reverseLink = function(head) {
	if (!head || !head.next)	return head;

	var newHead = null,
		p = head;
	while (p) {
		var tmp = p.next;
		p.next = newHead;
		newHead = p;
		p = tmp;
	}

	return newHead;
}

var reverseLinkRecuive = function(head) {
	if (!head || !head.next) return head;

	var newHead = reverseLinkRecuive(head.next);
	head.next.next = newHead;
	head.next = null;
	
	return newHead;
}