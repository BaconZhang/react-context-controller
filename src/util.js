const typeOf = (t) => Object.prototype.toString.call(t).slice(8,-1);
const hasOwn = Object.prototype.hasOwnProperty;
const is = Object.is;
const equalFunc = isEqual => (objA, objB) => {
  if (is(objA, objB)) return true;
  if (typeOf(objA) !== 'Object' || typeOf(objB) !== 'Object') {
    return false;
  }
  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)
  if (keysA.length !== keysB.length) return false
  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !isEqual(objA[keysA[i]], objB[keysA[i]])) {
      return false
    }
  }
  return true
}
export const isFunction = t => typeOf(t) === 'Function';
export const isObject = t => typeOf(t) === 'Object';
export const isString = t => typeOf(t) === 'String';
export const shallowEqual = equalFunc(is);
export const deepEqual = equalFunc(deepEqual);
export const copyFrozenObject = (obj) => {
  let temp = Object.assign({}, obj);
  Object.freeze(temp);
  return temp;
}