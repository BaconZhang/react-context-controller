const typeOf = (t) => Object.prototype.toString.call(t).slice(8, -1);
const hasOwn = Object.prototype.hasOwnProperty;

export const isFunction = t => typeOf(t) === 'Function';
export const isObject = t => typeOf(t) === 'Object';
export const isString = t => typeOf(t) === 'String';
// export const shallowEqual = (objA, objB) => {
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
export const deepEqual = (objA, objB) => {
  if (Object.is(objA, objB)) return true;
  if (typeOf(objA) !== 'Object' || typeOf(objB) !== 'Object') {
    return false;
  }
  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)
  if (keysA.length !== keysB.length) return false
  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !deepEqual(objA[keysA[i]], objB[keysA[i]])) {
      return false
    }
  }
  return true
};
export const copy = (o) => {
  if (isObject(o)) {
    return Object.assign({}, o);
  }
  return o;
}