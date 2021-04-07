/*
 * @Description: 覆盖uni默认的一些方法
 * @Author: 无痕
 * @Email: 350801869@qq.com
 * @Date: 2021-01-26 17:42:43
 * @LastEditTime: 2021-02-28 14:23:55
 * @LastEditors: 无痕
 */
import toast from '../../utils/toast';
import dialog from '../../utils/dialog';
import getTypeValue from '../../utils/getTypeValue';

/**
 * @name: 替换uni默认的showToast,hideToast
 * @return {void}
 */
export function replaceUniToast () {
  uni.showToast = function showToast (options = {}, cb) {
    options = getTypeValue(options, Object, { title: options });
    if (options.icon === 'none') {
      options.icon = '';
    }
    toast(Object.assign({
      message: options.title
    }, options), cb);
  };

  uni.hideToast = function hideToast (type = '') {
    toast.hide(type);
  };
}

/**
 * @name: 替换uni默认的showModal
 * @return {void}
 */
export function replaceUniModal () {
  uni.showModal = function showModal (options = {}) {
    dialog(options).then(() => { }, () => { });
  };
}

/**
 * @name: 替换uni默认的showLoading,hideLoading
 * @return {void}
 */
export function replaceUniLoading () {
  uni.showLoading = function showLoading (options = {}, cb) {
    options = getTypeValue(options, Object, { title: options });
    return toast.loading(Object.assign({
      message: options.title
    }, options), cb);
  };

  uni.hideLoading = function hideLoading () {
    toast.hide('loading');
  };
}
