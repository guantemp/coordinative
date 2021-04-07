import getType from './getType';

/**
 * @name: 判断是否为function
 * @param {*} value
 * @return {boolean}
 */
export default function isFunction (value) {
  return getType(value) === 'function';
}
