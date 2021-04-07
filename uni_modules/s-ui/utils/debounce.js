/**
 * @name: 函数防抖
 * @param {function} fn 回调函数
 * @param {number} wait 等待时间
 * @param {boolean} immediate 首次触发是否立即执行
 * @return {function}
 */
export default function debounce (fn, wait = 300, immediate = false) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    // immediate 为 true 表示第一次触发后执行
    // timer 为空表示首次触发
    if (immediate && !timer) {
      fn.apply(this, args);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}
