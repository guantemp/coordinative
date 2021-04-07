import emitPageMixin from './mixins/emitPageMixin';
import initMixin from './mixins/initMixin';
import { replaceUniLoading, replaceUniModal, replaceUniToast } from './plugins/uni';
import themeData from './theme/themeData';
import { getThemeData, changeTheme } from './theme';
import themeMixin from './theme/themeMixin';
import extend from './utils/extend';

const defaultOptions = {
  // 是否给页面page全局混入一个onEmitPage钩子，使用this.$emitPage(pagePath,...args)触发
  useEmitPageMixin: true,
  // 替换uni默认的showLoading,hideLoading
  replaceUniLoading: true,
  // 替换uni默认的showToast,hideToast
  replaceUniToast: true,
  // 替换uni默认的showModal
  replaceUniModal: true,
  // 主题变量更改和追加，使用this.$sTheme('{primary}')
  theme: themeData
};

/**
 * @name: vue插件
 * @param {Vue} Vue
 * @param {defaultOptions} options
 * @return {void}
 */
function install (Vue, options = {}) {
  options = extend(true, {}, defaultOptions, options);
  changeTheme(options.theme);
  // 页面mixin
  Vue.mixin(initMixin);
  // 主题mixin
  Vue.mixin(themeMixin);
  // onEmitPage生命周期
  if (options.useEmitPageMixin) {
    Vue.mixin(emitPageMixin);
  }
  if (options.replaceUniLoading) {
    replaceUniLoading();
  }
  if (options.replaceUniToast) {
    replaceUniToast();
  }
  if (options.replaceUniToast) {
    replaceUniModal();
  }
}

const sUi = {
  getThemeData,
  changeTheme,
  install
};

export default sUi;
