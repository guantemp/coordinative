/**
 * @name: 路径拼接
 * @param {String[]} args
 * @return {String}
 */
export default function joinPath (...args) {
  const length = args.length;
  return (length > 1 ? args.map((item, index) => {
    const path = String(item);
    if (index === 0) {
      return path.replace(/\/+$/g, '');
    } else if (index === length - 1) {
      return path.replace(/^\/+/g, '');
    } else {
      return path.replace(/^\/+|\/+$/g, '');
    }
  }) : args).filter(str => str !== '').join('/');
}
