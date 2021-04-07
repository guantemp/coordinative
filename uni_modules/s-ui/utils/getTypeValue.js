import arrayDifference from './arrayDifference';

const defaultTypeValue = [
  [String, () => ''],
  [Number, () => 0],
  [Boolean, () => false],
  [Array, () => []],
  [Object, () => { }],
  [Function, () => () => { }],
  [Map, () => new Map()],
  [Set, () => new Set()]
];

const allTypeList = defaultTypeValue.map(item => item[0]);

/**
 * @name: 类型验证获取value，返回默认值
 * @param {*} value
 * @param {*|Array} type
 * @param {*} defaultValue
 * @return {*}
 * @example: getTypeValue(1,Number) //1
 * @example: getTypeValue(1,Number,1) //1
 * @example: getTypeValue(true,Number,2) //2
 */
export default function getTypeValue (value, type, defaultValue) {
  const valueConstructor = (value !== undefined && value !== null) ? value.constructor : undefined;
  const typeList = (Array.isArray(type) ? type : [type]);
  const diffTypeList = arrayDifference(typeList, allTypeList);
  if (diffTypeList.length) {
    throw new Error(`getTypeValue type合法参数为 ${allTypeList.map(item => item.name).join(',')}`);
  }
  if (valueConstructor && typeList.includes(valueConstructor)) {
    return value;
  }
  const defaultValueConstructor = (defaultValue !== undefined && defaultValue !== null) ? defaultValue.constructor : undefined;
  if (defaultValueConstructor && typeList.includes(defaultValueConstructor)) {
    return defaultValue;
  }
  return defaultTypeValue[allTypeList.indexOf(typeList[0])][1]();
}
