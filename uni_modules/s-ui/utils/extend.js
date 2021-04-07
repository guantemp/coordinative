import isFunction from './isFunction';
import isPlainObject from './isPlainObject';
import isArray from './isArray';

/**
 * @name: 对象拷贝克隆，覆盖传值
 * @param {object} args
 * @return {object}
 */
export default function extend (...args) {
  let options; let name; let src; let copy; let copyIsArray; let clone;
  let target = args[0] || {};
  let i = 1;
  const length = args.length;
  let deep = false;
  // Handle a deep copy situation
  if (typeof target === 'boolean') {
    deep = target;
    // Skip the boolean and the target
    target = args[i] || {};
    i++;
  }
  // Handle case when target is a string or something (possible in deep copy)
  if (typeof target !== 'object' && !isFunction(target)) {
    target = {};
  }
  for (; i < length; i++) {
    // Only deal with non-null/undefined values
    if ((options = args[i]) != null) {
      // Extend the base object
      for (name in options) {
        copy = options[name];
        // Prevent Object.prototype pollution
        // Prevent never-ending loop
        if (name === '__proto__' || target === copy) {
          continue;
        }
        // Recurse if we're merging plain objects or arrays
        if (deep && copy && (isPlainObject(copy) ||
          (copyIsArray = isArray(copy)))) {
          src = target[name];
          // Ensure proper type for the source value
          if (copyIsArray && !isArray(src)) {
            clone = [];
          } else if (!copyIsArray && !isPlainObject(src)) {
            clone = {};
          } else {
            clone = src;
          }
          copyIsArray = false;
          // Never move original objects, clone them
          target[name] = extend(deep, clone, copy);
          // Don't bring in undefined values
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }
  // Return the modified object
  return target;
}
