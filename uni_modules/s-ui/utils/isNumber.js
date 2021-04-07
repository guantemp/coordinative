import getType from './getType';

/**
 * @name: 判断是否为number
 * @param {*} value
 * @return {boolean}
 */
export default function isNumber (value) {
  return getType(value) === 'number';
}
