/**
 * @name: 去掉字符串2边空格
 * @param {*} str
 * @return {string}
 */
export default function trim (str) {
  return (str || str === 0) ? String(str).trim() : '';
}
