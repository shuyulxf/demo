function FindFirstCommonNode(pHead1, pHead2)
{
    if(!pHead1 || !pHead2) return null;
     
    if (pHead1 == pHead2) return pHead1;
     
    var len1 = 0,
        len2 = 0;
     
    var p1 = pHead1,
        p2 = pHead2;
     
    while (p1) {
        len1++;
        p1 = p1.next;
    }
     
    while (p2) {
        len2++;
        p2 = p2.next;
    }
     
    var k = Math.abs(len1 - len2);
    p1 = pHead1,
    p2 = pHead2;
    if (len1 > len2) {
        while(k > 0) {
            p1 = p1.next;
            k--;
        }
    } else {
        while(k > 0) {
            p2 = p2.next;
            k--;
        }
    }
     
    while (p1 != p2 && p1 && p2) {
        p1 = p1.next;
        p2 = p2.next;
    }
     
    if (!p1 || !p2) return null;
    return p1;
}