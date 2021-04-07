import noop from './noop';
import createTimer from './createTimer';

/**
 * @name: 倒计时控制器
 * @param {Number} seconds 秒数
 * @param {Function(Number)} callback 每减一秒回掉
 * @param {Function} complete 倒计时完后回掉
 * @param {Number} wait 延时时间
 * @param {Boolean} immediate 初始化是否启动
 * @return {object} {start:Function(newSeconds),stop:Function} 返回一个对象，可暂停和启动
 */
export default function countDown (seconds = 0, callback = noop, complete = noop, wait = 1000, immediate = true) {
  const timer = createTimer(next => {
    if (seconds > 0) {
      callback(seconds);
      seconds--;
      next();
    } else {
      stop();
      complete();
    }
  }, wait, immediate);

  const start = function (newSeconds) {
    if (typeof newSeconds === 'number') {
      seconds = newSeconds;
    }
    timer.start();
  };

  const stop = function () {
    timer.stop();
  };

  return { start, stop };
}
