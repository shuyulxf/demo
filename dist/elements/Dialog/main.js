'use strict';

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// (function (global, factory) {
// 	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
// 	typeof define === 'function' && define.amd ? define(factory) :
// 	(global.VueRouter = factory());
// }(window ? window : global ? global : sef, (function () { 

var DialogBase = function DialogBase(options) {
    _classCallCheck(this, DialogBase);
};

var AlertDailog = function (_DialogBase) {
    _inherits(AlertDailog, _DialogBase);

    function AlertDailog(options) {
        _classCallCheck(this, AlertDailog);

        return _possibleConstructorReturn(this, (AlertDailog.__proto__ || Object.getPrototypeOf(AlertDailog)).call(this, options));
    }

    return AlertDailog;
}(DialogBase);

var ConfirmDialog = function (_DialogBase2) {
    _inherits(ConfirmDialog, _DialogBase2);

    function ConfirmDialog(options) {
        _classCallCheck(this, ConfirmDialog);

        return _possibleConstructorReturn(this, (ConfirmDialog.__proto__ || Object.getPrototypeOf(ConfirmDialog)).call(this, options));
    }

    return ConfirmDialog;
}(DialogBase);

var PromptDialog = function (_DialogBase3) {
    _inherits(PromptDialog, _DialogBase3);

    function PromptDialog(options) {
        _classCallCheck(this, PromptDialog);

        return _possibleConstructorReturn(this, (PromptDialog.__proto__ || Object.getPrototypeOf(PromptDialog)).call(this, options));
    }

    return PromptDialog;
}(DialogBase);

var Dialog = function Dialog(options) {
    _classCallCheck(this, Dialog);

    var type = options.type,
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
};

var dialog = Dialog;
//export { dialog };

//})));