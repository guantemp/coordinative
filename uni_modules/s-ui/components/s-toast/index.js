import getTypeValue from '../../utils/getTypeValue';

let timer = 0;

// 默认参数
const defaultOptions = {
  type: '', // 提示类型，会自动拼接一个对应的class
  className: '', // 自定义class
  background: 'rgba(0, 0, 0, 0.8)', // 背景色
  color: '#ffffff', // 内容色
  position: 'center', // 显示位置，center|top|bottom
  effect: true, // 是否含有隐藏关闭效果
  effectDuration: 200, // 显示隐藏过度时间
  message: '', // 提示信息
  icon: '', // 提示图标
  image: '', // 图片图标，可覆盖icon图标
  imageStyle: '', // 图片图标样式
  mask: true, // 是否显示遮罩
  maskOpacity: 0, // 遮罩透明度
  duration: 2000, // 自动关闭时间
  zIndex: 9000, // 如没指定，则在显示时使用比较自增
  custom: '' // 自定义参数，用于特殊场景判断
};

/**
 * @name: 参数模型
 * @param {String|defaultOptions} options
 * @return {object}
 */
function getOptions (options) {
  options = getTypeValue(options, Object, { message: options });
  return {
    type: getTypeValue(options.type, String, defaultOptions.type),
    className: getTypeValue(options.className, String, defaultOptions.className),
    background: getTypeValue(options.background, String, defaultOptions.background),
    color: getTypeValue(options.color, String, defaultOptions.color),
    position: getTypeValue(options.position, String, defaultOptions.position),
    effect: getTypeValue(options.effect, Boolean, defaultOptions.effect),
    effectDuration: getTypeValue(options.effectDuration, Number, defaultOptions.effectDuration),
    message: options.message !== undefined ? options.message : defaultOptions.message,
    icon: getTypeValue(options.icon, String, defaultOptions.icon),
    image: getTypeValue(options.image, String, defaultOptions.image),
    imageStyle: getTypeValue(options.imageStyle, [String, Object], defaultOptions.imageStyle),
    mask: getTypeValue(options.mask, Boolean, defaultOptions.mask),
    maskOpacity: getTypeValue(options.maskOpacity, Number, defaultOptions.maskOpacity),
    duration: getTypeValue(options.duration, Number, defaultOptions.duration),
    zIndex: getTypeValue(options.zIndex, [String, Number], defaultOptions.zIndex),
    custom: options.custom
  };
}

const state = {
  isInit: true,
  visible: false,
  syncType: '',
  maskClose: false,
  ...getOptions()
};

/**
 * @name: 显示toast
 * @param {String|defaultOptions} options
 * @param {Function?} cb 关闭后
 * @return {void}
 */
function toast (options, cb) {
  clearTimeout(timer);
  options = getOptions(options);
  state.syncType = options.type;
  state.custom = options.custom;
  if (
    state.isInit &&
    state.visible &&
    state.type === 'loading' &&
    options.type === 'loading' &&
    state.duration <= 0 &&
    options.duration <= 0
  ) {
    // 如果前后都是不会自动关闭的loading，则不重新初始化，用于解决多个接口发起时loading闪烁
    Object.assign(state, options);
  } else {
    state.isInit = false;
    state.visible = false;
    timer = setTimeout(() => {
      Object.assign(state, options, {
        isInit: true,
        visible: true
      });
      if (options.duration > 0) {
        timer = setTimeout(() => {
          state.visible = false;
          typeof cb === 'function' && cb();
        }, options.effectDuration + options.duration);
      }
    });
  }
};

/**
 * @name: 关闭toast
 * @param {String} type
 * @return {void}
 */
function hide (type = '') {
  if (!type || typeof type !== 'string' || state.syncType === type) {
    clearTimeout(timer);
    state.visible = false;
  }
}

/**
 * @name: 马上清除正在显示的toast
 * @return {void}
 */
function clear () {
  clearTimeout(timer);
  state.isInit = false;
  state.visible = false;
}

/**
 * @name: 显示loading
 * @param {string|defaultOptions} options
 * @param {Function?} cb 关闭后
 * @return {void}
 */
function loading (options, cb) {
  toast(Object.assign(
    {},
    loading.defaultOptions,
    getTypeValue(options, Object, { message: options })
  ), cb);
};

loading.defaultOptions = {
  type: 'loading',
  icon: 'loading',
  duration: 0
};

/**
 * @name: 显示成功toast
 * @param {string|defaultOptions} options
 * @param {Function?} cb 关闭后
 * @return {void}
 */
function success (options, cb) {
  toast(Object.assign(
    {},
    success.defaultOptions,
    getTypeValue(options, Object, { message: options })
  ), cb);
}

success.defaultOptions = {
  type: 'success',
  icon: 'success'
};

/**
 * @name: 显示失败toast
 * @param {string|defaultOptions} options
 * @param {Function?} cb 关闭后
 * @return {void}
 */
function fail (options, cb) {
  toast(Object.assign(
    {},
    fail.defaultOptions,
    getTypeValue(options, Object, { message: options })
  ), cb);
};

fail.defaultOptions = {
  type: 'fail',
  icon: 'fail'
};

toast.defaultOptions = defaultOptions;
toast.state = state;
toast.loading = loading;
toast.success = success;
toast.fail = fail;
toast.hide = hide;
toast.clear = clear;

export default toast;
