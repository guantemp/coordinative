/**
 * @name: 格式化秒数为周，天,小时，分钟，秒 对象
 * @param {Number} seconds
 * @param {String} fmt
 * @return {*} {d,h,m,s}
 */
export default function formatSeconds (seconds, fmt = 'd,h,m,s') {
  const obj = {};
  [
    { attr: 'w', modulo: 60 * 60 * 24 * 7 },
    { attr: 'd', modulo: 60 * 60 * 24 },
    { attr: 'h', modulo: 60 * 60 },
    { attr: 'm', modulo: 60 },
    { attr: 's', modulo: 1 }
  ].forEach(({ attr, modulo }) => {
    if (fmt.indexOf(attr) > -1) {
      obj[attr] = Math.floor(seconds / modulo);
      seconds -= obj[attr] * modulo;
    }
  });
  return obj;
}
