let bubbleSort = function(arr) {
    if (!arr) throw new Error("new error!");
    
    let len = arr.length;
    for (let i = 0; i < len-1; i++) {
        for (let j = i; j< len; j++) {
            if (arr[i] > arr[j]) {
                swap(arr, i, j);
            }
        }
    }
    
    return arr;
}
    
let swap = function(arr, i, j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}