let selectSort = function(arr) {
   	if (!arr) throw new Error("new error!");
    
    let len = arr.length;
    for(let i = 0; i < len - 1; i ++) {
        let t = i;
        for (let j = i+1; j < len; j++) {
            if (arr[j] < arr[t]) t = j;
        }
        if (t != i) swap(arr, i, t);
    }
    return arr;
}
    
let swap = function(arr, i, j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}