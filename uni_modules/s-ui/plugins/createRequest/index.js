import extend from '../../utils/extend';
import getTypeValue from '../../utils/getTypeValue';
import joinPath from '../../utils/joinPath';
import toast from '../../utils/toast';
import createError from './createError';
import createSuccess from './createSuccess';
import defaultConfig from './defaultConfig';
import defaultInterceptors from './defaultInterceptors';
import failMap from './failMap';
import loading from './loading';

/**
 * @name: 创建一个请求器
 * @param {defaultConfig} config 默认参数
 * @param {defaultInterceptors} interceptors 拦截器
 * @return {function(defaultConfig)}
 */
export default function createRequest (config = {}, interceptors = {}) {
  // 配置参数
  config = extend(true, {}, defaultConfig, config);
  // 拦截器
  interceptors = extend(true, {}, defaultInterceptors, interceptors);

  /**
   * @name: 请求方法
   * @param {defaultConfig} options
   * @return {Promise}
   */
  const request = function request (options = {}) {
    options = extend(true, {}, config, options);
    // method转大写
    options.method = options.method.toUpperCase();
    // 路径参数赋值
    if (options.url && options.urlParams) {
      options.url = options.url.replace(/{([^{}}]+)}/g, (_str, k) => {
        return options.urlParams[k];
      });
    }
    // 执行拦截器
    options = getTypeValue(interceptors.request(options), Object, options);
    // 判断url是否是带域名的绝对路径，然后拼接域名
    if (!/^(https|http|\/{2})/.test(options.url)) {
      options.url = joinPath(options.baseURL, options.url);
    }
    // 显示loading
    if (options.showLoading && options.useDefaultLoading) {
      loading.show(options.loadingText, options.loadingTime);
    }
    options.getTask = getTypeValue(options.getTask, Function, defaultConfig.getTask);
    options.validateStatus = getTypeValue(options.validateStatus, Function, defaultConfig.validateStatus);

    return new Promise((resolve, reject) => {
      options.complete = response => {
        // 关闭loading
        if (options.showLoading && options.useDefaultLoading) {
          loading.hide();
        }
        // 判断请求状态
        if (options.validateStatus(response, options)) {
          resolve({
            options,
            data: response.data,
            createError,
            createSuccess
          });
        } else {
          const code = response.statusCode;
          let msg = failMap[code];
          if (!msg) {
            const errMsg = response.errMsg;
            if (errMsg.indexOf('timeout') > -1) {
              msg = '请求超时';
            } else {
              msg = errMsg;
            }
          }
          const error = createError(code, msg);
          if (options.showError && options.useDefaultToast) {
            toast({
              message: error.msg,
              duration: options.toastTime
            });
          }
          reject({
            options,
            error: createError(code, msg),
            createError
          });
        }
      };
      setTimeout(() => {
        options.getTask(uni.request(options));
      }, options.delayTime);
    }).then(
      interceptors.success,
      interceptors.fail
    );
  };
  // 增加属性方法
  ['get', 'post', 'put', 'delete', 'head', 'trace', 'options', 'connect'].map(method => {
    request[method] = (url, data, options) => request({
      method,
      url,
      data,
      ...options
    });
  });
  return request;
}
