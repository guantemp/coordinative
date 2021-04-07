/*
 * @Description: 默认拦截器，处理返回结果
 * @Author: 无痕
 * @Email: 350801869@qq.com
 * @Date: 2021-02-02 13:48:00
 * @LastEditTime: 2021-02-04 10:15:03
 * @LastEditors: 无痕
 */
const defaultInterceptors = {
  /**
   * @name: 发起请求前拦截器
   * @param {object} options
   * @return {object|void}
   */
  request (options) {
    return options;
  },
  /**
   * @name: 请求成功拦截器
   * @param {object}
   * @return {object}
   */
  success ({
    options,
    data,
    createError,
    createSuccess
  }) {
    return createSuccess(data);
  },
  /**
   * @name: 请求失败拦截器
   * @param {object}
   * @return {Error}
   */
  fail ({
    options,
    error,
    createError
  }) {
    return error;
  }
};

export default defaultInterceptors;
