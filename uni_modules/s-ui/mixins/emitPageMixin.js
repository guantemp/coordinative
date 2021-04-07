/*
 * @Description: 用于给页面混入一个定制的生命周期 onEmitPage，使用this.$emitPage(pagePath,arguments)触发
 * @Author: 无痕
 * @Email: 350801869@qq.com
 * @Date: 2021-02-03 10:04:35
 * @LastEditTime: 2021-02-25 09:42:08
 * @LastEditors: 无痕
 */
import getCurrentPagePath from '../utils/getCurrentPagePath';

function getName (pagePath = '') {
  return `s-emit-page-${pagePath.replace(/^\/+/, '')}`;
}
const eventName = '[S_EVENT_EMIT_PAGE_]';

const emitPageMixin = {
  onLoad () {
    if (typeof this.$options.onEmitPage === 'function') {
      const pagePath = getCurrentPagePath();
      this[eventName] = getName(pagePath);
      uni.$on(this[eventName], this.$options.onEmitPage);
    }
  },
  methods: {
    /**
     * @name: 触发页面的onEmitPage事件
     * @param {String} pagePath 页面路径
     * @param {*} args
     * @return {void}
     */
    $emitPage (pagePath, ...args) {
      uni.$emit(getName(pagePath), ...args);
    }
  },
  onUnload () {
    if (this[eventName]) {
      uni.$off(this[eventName], this.$options.onEmitPage);
    }
  }
};

export default emitPageMixin;
