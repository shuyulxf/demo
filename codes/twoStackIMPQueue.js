let stack1 = new Array(),
    stack2 = new Array();

function push(node)
{
    stack1.push(node);
}
function pop()
{
    if (stack2.length <= 0) {
        for (var len = stack1.length-1, i = len; i >= 0; i--) {
            stack2.push(stack1.pop());
        }
    }
    
    if (stack2.length) {
        return stack2.pop();
    } else throw new Error("Stack is empty!");
    
}

