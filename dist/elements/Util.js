"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = function () {
    function Util() {
        _classCallCheck(this, Util);
    }

    _createClass(Util, [{
        key: "assert",
        value: function assert(condition, element, message) {
            if (!condition) {
                throw new Error("[" + element + "] " + message);
            }
        }
    }, {
        key: "warn",
        value: function warn(condition, element, message) {
            if (!condition) {
                typeof console !== 'undefined' && console.warn("[" + element + "] " + message);
            }
        }
    }, {
        key: "isError",
        value: function isError(err) {
            return Object.prototype.toString.call(err).indexOf('Error') > -1;
        }
    }]);

    return Util;
}();

var util = Util;
//export { util };