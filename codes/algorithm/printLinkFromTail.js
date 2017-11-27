function printListFromTailToHead(head)
{	
	var rst = [];
    helper(head, rst);
    
    return rst;
    
}
function helper(head, rst) {
    if (head == null) return;
    
    helper(head.next, rst);

    rst.push(head.val);
}

function printListFromTailToHead1(head)
{
    var rlt = [];
    if(!head) return rlt;

    var p = head;
    while( p ) {
        rlt.unshift(p.val);
        p = p.next;
        
    }
    
    return rlt;
}