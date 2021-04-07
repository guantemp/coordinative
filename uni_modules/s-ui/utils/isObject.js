import getType from './getType';

/**
 * @name: 判断是否为object
 * @param {*} value
 * @return {boolean}
 */
export default function isObject (value) {
  return getType(value) === 'object';
}
