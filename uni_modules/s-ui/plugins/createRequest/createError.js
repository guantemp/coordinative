class RequestError extends Error {
  constructor (code, msg) {
    super(msg);
    this.type = 'RequestError';
    this.ok = false;
    this.code = code;
    this.msg = msg;
  }
}

/**
 * @name: 包装一个错误对象
 * @param {Number|String} code
 * @param {String} message
 * @return {RequestError}
 */
export default function createError (code = 500, msg = '请求异常') {
  return new RequestError(code, msg);
};
