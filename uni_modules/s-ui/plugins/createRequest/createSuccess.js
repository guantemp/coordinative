import isObject from '../../utils/isObject';

/**
 * @name: 包装一个成功返回对象
 * @param {*} data
 * @return {object}
 */
export default function createSuccess (data) {
  data = isObject(data) ? data : { data };
  return { ok: true, code: 200, ...data };
};
