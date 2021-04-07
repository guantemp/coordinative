/**
 * @name: 格式化数字
 * @param {Number} number 数字
 * @param {Number} places 保留的小位数,2
 * @param {String} thousand 用啥隔开：','
 * @param {String} decimal 表示小数点:'.'
 * @return {String}
 */
export default function formatNumber (number = 0, places = 0, thousand = ',', decimal = '.') {
  number = number || 0;
  const negative = number < 0 ? '-' : '';
  const i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + '';
  const j = i.length > 3 ? i.length % 3 : 0;
  return negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : '');
}
