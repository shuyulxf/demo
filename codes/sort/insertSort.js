let insertSort = function(arr) {
    if (!arr) throw new Error("new error!");

    let len = arr.length;
    for (let i = 1; i < len; i++) {
        if (arr[i] < arr[i-1]) {
            let k = i - 1,
                d = arr[i];
            arr[i] = arr[i-1];
            while(arr[k] > d) {
                arr[k--] = arr[k];
            }
            arr[k+1] = d;
        }
    }

    return arr;
}

let swap = function(arr, i, j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}