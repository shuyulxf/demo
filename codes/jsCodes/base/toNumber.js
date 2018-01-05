/* from judgeDataType.js */
let isVarType = function() {

    let types = ["Array", "Boolean", "Date", "Number", "Object", "RegExp", "String", "Window", "HTMLDocument"];
    debugger;
    for (let i in types) {
        let type = types[i];
        isVarType["is" + type] = function(data) {
            return !(!data) && Object.prototype.toString.call(data) === "[object " + type + "]";
        }
    }
}
isVarType();

let isValidNumber = function(data) {
    return !isNaN(Number(data));
}
let toNumber = function(data) {
    
    if (isVarType.isString(data)) {

        if (!isValidNumber(data)) throw new Error("data is String type, but not valid number style!");
        return Number(data);
    }
}