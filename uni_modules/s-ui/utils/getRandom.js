/**
 * @name: 获取指定位数的随机数
 * @param {number} num
 * @return {string}
 */
export default function getRandom (num) {
  let str = '';
  for (let i = 0; i < num; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
}
