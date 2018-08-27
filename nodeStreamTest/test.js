module.exports = function () {
    var sum = 0, i = 0,
    args = arguments,
    l = args.length; while (i < l) {
        
      sum += args[i++]; }
    return sum; 
}

delete require.cache['/Users/shuyu/Documents/demo/nodeTest/test.js']