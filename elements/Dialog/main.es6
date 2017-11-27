// (function (global, factory) {
// 	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
// 	typeof define === 'function' && define.amd ? define(factory) :
// 	(global.VueRouter = factory());
// }(window ? window : global ? global : sef, (function () { 

class DialogBase {
    constructor(options) {
    }
}

class AlertDailog extends DialogBase {
    constructor(options) {
        super(options);
    }
}

class ConfirmDialog extends DialogBase { 
    constructor(options) {
        super(options);
    }
}

class PromptDialog extends DialogBase {
    constructor(options) {
        super(options);
    }
}

class Dialog {
    constructor(options) {
        let {type} = options,
            dialog = null;

        switch (type) {
            case 'alert':
                dialog = new AlertDailog(options);
                break;
            case 'confirm':
                dialog = new ConfirmDialog(options);
                break;
            case 'prompt':
                dialog = new PromptDialog(options);
                break;
            default:

                break;
        }
    }
}

let dialog = Dialog;
//export { dialog };

//})));

