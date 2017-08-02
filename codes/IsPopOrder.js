function IsPopOrder(pushV, popV)
{
    if (!pushV || !popV || !pushV.length || !popV.length) return true;

    var stack = [],
        len = pushV.length,
        i = 0,
        j = 0;
    
    while (i < len) {
        var v = popV[i];
        while (stack.length < 1 || stack[stack.length - 1] != popV[i]) {
            if (j -  i == len) break;
            stack.push(pushV[j]);
            j++;
        }

        if (stack[stack.length - 1] !== v) break;
        stack.pop();
        i++;
    }

    if (stack.length == 0 && i == len) return true;
    return false;
    
}