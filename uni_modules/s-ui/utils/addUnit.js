/**
 * @name: 添加单位
 * @param {String|Number} val ''
 * @param {String} unit rpx
 * @return {String} ''
 */
export default function addUnit (val = '', unit = 'rpx') {
  return val !== '' && Number(val) == val ? val + unit : val;
}
