/**
 * @name: 隐藏手机号码中的几位数字加密显示
 * @param {String} phone
 * @return {String}
 */
export default function privatePhone (phone) {
  return ('' + phone).replace(/^(\d{3})\d{4}(\d{4})$/g, '$1****$2');
}
