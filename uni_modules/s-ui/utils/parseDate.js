import isValidDate from './isValidDate';

/**
 * @name: 尝试转一个合法Date对象,兼容ios
 * @param {string|Date|number} date
 * @return {Date}
 */
export default function parseDate (date) {
  if (!date) return;
  if (typeof date === 'string') {
    if (/^\d*$/.test(date)) {
      date = Number(date);
    } else if (!isValidDate(date)) {
      date = date.replace(/-/g, '/').replace(/(\.0)$/, '');
    }
  }
  return new Date(date);
}
