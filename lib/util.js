"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copy = exports.deepEqual = exports.isString = exports.isObject = exports.isFunction = void 0;

var typeOf = function typeOf(t) {
  return Object.prototype.toString.call(t).slice(8, -1);
};

var hasOwn = Object.prototype.hasOwnProperty;

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
}; // export const shallowEqual = (objA, objB) => {
//   if (Object.is(objA, objB)) return true;
//   if (typeOf(objA) !== 'Object' || typeOf(objB) !== 'Object') {
//     return false;
//   }
//   const keysA = Object.keys(objA)
//   const keysB = Object.keys(objB)
//   if (keysA.length !== keysB.length) return false
//   for (let i = 0; i < keysA.length; i++) {
//     if (!hasOwn.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) {
//       return false
//     }
//   }
//   return true
// };


exports.isString = isString;

var deepEqual = function deepEqual(objA, objB) {
  if (Object.is(objA, objB)) return true;

  if (typeOf(objA) !== 'Object' || typeOf(objB) !== 'Object') {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !deepEqual(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
};

exports.deepEqual = deepEqual;

var copy = function copy(o) {
  if (isObject(o)) {
    return Object.assign({}, o);
  }

  return o;
};

exports.copy = copy;