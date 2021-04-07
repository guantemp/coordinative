/**
 * @name: 创建一个定时控制器
 * @param {function} fn 每次执行回调
 * @param {number} wait 延时时间
 * @param {boolean} immediate 初始化是否启动
 * @return {object} {start:Function,stop:Function}返回一个对象，可暂停和启动
 */
export default function createTimer (fn, wait = 5000, immediate = false) {
  let timerId = 0;
  let isStop = true;

  const start = function () {
    if (isStop) {
      isStop = false;
      fn(next, stop);
    }
  };
  const next = function () {
    if (!isStop) {
      stop();
      timerId = setTimeout(start, wait);
    }
  };
  const stop = function () {
    clearTimeout(timerId);
    isStop = true;
  };

  if (immediate) start();

  return { start, stop };
}
