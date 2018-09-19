"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Observer = function Observer() {
  var _this = this;

  _classCallCheck(this, Observer);

  _defineProperty(this, "on", function (key, func) {
    if (!_this._messages[key]) {
      _this._messages[key] = [func];
    } else {
      _this._messages[key].push(func);
    }
  });

  _defineProperty(this, "emit", function (key) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (_this._messages[key]) {
      _this._messages[key].forEach(function (func) {
        return func.apply(void 0, args);
      });
    }
  });

  _defineProperty(this, "off", function (type, func) {
    var listeners = _this._messages[type];

    if (Array.isArray(listeners) && listeners.length) {
      listeners.splice(listeners.indexOf(func), 1);
    }
  });

  this._messages = {};
};

exports.default = Observer;