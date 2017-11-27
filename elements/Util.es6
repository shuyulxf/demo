let Util = class Util {
    assert (condition, element, message) {
        if (!condition) {
            throw new Error(("[" + element + "] " + message))
        }
    }

    warn (condition, element, message) {
        if (!condition) {
            typeof console !== 'undefined' && console.warn(("[" + element + "] " + message));
        }
    }

    isError (err) {
        return Object.prototype.toString.call(err).indexOf('Error') > -1
    }  
}

let util = Util;
//export { util };
 