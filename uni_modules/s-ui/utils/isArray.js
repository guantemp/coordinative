import getType from './getType';

/**
 * @name: 是否为数组
 * @param {*} value
 * @return {boolean}
 */
export default function isArray (value) {
  return getType(value) === 'array';
}
