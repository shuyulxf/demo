function PrintFromTopToBottom(root)
{
    var rlt = [];
    if (!root) return rlt;
    var queue = [];
    queue.push(root);
    
    while (queue.length > 0) {
        var node = queue.shift();
        if (!node) break;
        rlt.push(node.val);
        
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
    
    return rlt;
}