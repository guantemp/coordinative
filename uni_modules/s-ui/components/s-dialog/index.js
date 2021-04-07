import getTypeValue from '../../utils/getTypeValue';

let timer = 0;

// 默认参数
const defaultOptions = {
  className: '', // 自定义class
  background: '#ffffff', // 背景色
  effect: true, // 是否含有隐藏关闭效果
  effectDuration: 300, // 显示隐藏过度时间
  maskOpacity: 0.7, // 遮罩透明度
  title: '', // 提示头
  titleColor: '{textPrimary}', // 提示头颜色
  message: '', // 提示信息
  content: '', // 提示信息
  messageColor: '{textPrimary}', // 提示信息颜色
  showCancel: true, // 是否显示取消按钮
  cancelClass: 's-btn', // 取消按钮class
  cancelText: '取消', // 取消按钮文字
  cancelColor: '{textPrimary}', // 取消按钮颜色
  confirmClass: 's-btn', // 确认按钮class
  confirmText: '确定', // 确认按钮文字
  confirmColor: '{primary}', // 确认按钮颜色
  zIndex: 9999, // 如没指定，则在显示时使用比较自增
  success ({ confirm, cancel }) { },
  custom: '' // 自定义参数，用于特殊场景判断
};

/**
 * @name: 参数模型
 * @param {String|defaultOptions} options
 * @return {object}
 */
function getOptions (options) {
  options = getTypeValue(options, Object, { message: options, content: options });
  return {
    className: getTypeValue(options.className, String, defaultOptions.className),
    background: getTypeValue(options.background, String, defaultOptions.background),
    effect: getTypeValue(options.effect, Boolean, defaultOptions.effect),
    effectDuration: getTypeValue(options.effectDuration, Number, defaultOptions.effectDuration),
    maskOpacity: getTypeValue(options.maskOpacity, Number, defaultOptions.maskOpacity),
    title: options.title !== undefined ? options.title : defaultOptions.title,
    titleColor: getTypeValue(options.titleColor, String, defaultOptions.titleColor),
    message: options.message !== undefined ? options.message : defaultOptions.message,
    content: options.content !== undefined ? options.content : defaultOptions.content,
    messageColor: getTypeValue(options.messageColor, String, defaultOptions.messageColor),
    showCancel: getTypeValue(options.showCancel, Boolean, defaultOptions.showCancel),
    cancelClass: getTypeValue(options.cancelClass, String, defaultOptions.cancelClass),
    cancelText: getTypeValue(options.cancelText, String, defaultOptions.cancelText),
    cancelColor: getTypeValue(options.cancelColor, String, defaultOptions.cancelColor),
    confirmClass: getTypeValue(options.confirmClass, String, defaultOptions.confirmClass),
    confirmText: getTypeValue(options.confirmText, String, defaultOptions.confirmText),
    confirmColor: getTypeValue(options.confirmColor, String, defaultOptions.confirmColor),
    zIndex: getTypeValue(options.zIndex, [String, Number], defaultOptions.zIndex),
    success: getTypeValue(options.success, Function, defaultOptions.success),
    custom: options.custom
  };
}

const handler = {
  reject () { },
  resolve () { },
  success () { }
};

const state = {
  isInit: false,
  position: 'center',
  mask: true,
  maskClose: false,
  visible: false,
  ...getOptions(),
  onCancel () {
    hide();
    handler.success && handler.success({ confirm: false, cancel: true });
    handler.reject && handler.reject();
  },
  onConfirm () {
    hide();
    handler.success && handler.success({ confirm: true, cancel: false });
    handler.resolve && handler.resolve();
  }
};

/**
 * @name: 显示dialog
 * @param {string|defaultOptions} options
 * @return {promise}
 */
function dialog (options) {
  options = getOptions(options);
  state.custom = options.custom;
  clear();
  return new Promise((resolve, reject) => {
    timer = setTimeout(() => {
      Object.assign(handler, { reject, resolve, success: options.success });
      Object.assign(state, options, {
        isInit: true,
        visible: true
      });
    });
  });
};

/**
 * @name: 关闭dialog
 * @return {void}
 */
function hide () {
  clearTimeout(timer);
  state.visible = false;
}

/**
 * @name: 马上清除正在显示的dialog
 * @return {void}
 */
function clear () {
  clearTimeout(timer);
  state.isInit = false;
  state.visible = false;
}

dialog.defaultOptions = defaultOptions;
dialog.state = state;
dialog.hide = hide;
dialog.clear = clear;

export default dialog;
