(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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


},{}]},{},[1])

//# sourceMappingURL=bundle.js.map
