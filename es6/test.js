function * helloWorldGenerator() {
    var y = yield test1();
    console.log(y)
    return 'ending';
}

function test1() {
    console.log("test1");
    hw.next(1);
}
function test2() {
    console.log("test2");
}
function test3() {
    console.log("test3");
}

var hw = helloWorldGenerator();
console.log(hw.next());
