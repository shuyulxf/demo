function TreeDepth(pRoot)
{
    if (!pRoot) return 0;

    var left = TreeDepth(pRoot.left),
    	right = TreeDepth(pRoot.right);

    return left > right ? left + 1 : right + 1;
}