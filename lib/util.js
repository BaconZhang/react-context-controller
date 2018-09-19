"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyFrozenObject = exports.deepEqual = exports.shallowEqual = exports.isString = exports.isObject = exports.isFunction = void 0;

var typeOf = function typeOf(t) {
  return Object.prototype.toString.call(t).slice(8, -1);
};

var hasOwn = Object.prototype.hasOwnProperty;
var is = Object.is;

var equalFunc = function equalFunc(isEqual) {
  return function (objA, objB) {
    if (is(objA, objB)) return true;

    if (typeOf(objA) !== 'Object' || typeOf(objB) !== 'Object') {
      return false;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;

    for (var i = 0; i < keysA.length; i++) {
      if (!hasOwn.call(objB, keysA[i]) || !isEqual(objA[keysA[i]], objB[keysA[i]])) {
        return false;
      }
    }

    return true;
  };
};

var isFunction = function isFunction(t) {
  return typeOf(t) === 'Function';
};

exports.isFunction = isFunction;

var isObject = function isObject(t) {
  return typeOf(t) === 'Object';
};

exports.isObject = isObject;

var isString = function isString(t) {
  return typeOf(t) === 'String';
};

exports.isString = isString;
var shallowEqual = equalFunc(is);
exports.shallowEqual = shallowEqual;
var deepEqual = equalFunc(deepEqual);
exports.deepEqual = deepEqual;

var copyFrozenObject = function copyFrozenObject(obj) {
  var temp = Object.assign({}, obj);
  Object.freeze(temp);
  return temp;
};

exports.copyFrozenObject = copyFrozenObject;