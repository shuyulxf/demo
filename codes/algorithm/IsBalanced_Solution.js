function IsBalanced_Solution(pRoot)
{
	return help(pRoot) == -1 ? false : true;
}

function help(pRoot) {
	if (!pRoot) return 0;

	var left = help(pRoot.left);
	if (left == -1)  return -1;

	var	right = help(pRoot.right);
	if (right == -1) return -1;

	if (Math.abs(left - right) > 1) return -1;

	return (left > right ? left : right) + 1; 
}