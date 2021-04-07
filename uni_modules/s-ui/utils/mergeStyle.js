import toLine from './toLine';

/**
 * @name: 合并多个style
 * @param {Array<String|object>} styles
 * @return {String} 返回字符串style，兼容其它端
 * @example: mergeStyle('width:10rpx',{height:'20rpx',zIndex:2},'border:2rpx')
 * //width:10rpx;height:20rpx;z-index:2;border:2rpx
 */
export default function mergeStyle (...styles) {
  return styles.map(style => {
    let str = '';
    if (typeof style === 'string') {
      str = style;
    } else if (typeof style === 'object') {
      const keys = Object.keys(style).filter(k => style[k] || style[k] === 0);
      str = keys.map(k => `${toLine(k)}:${style[k]}`).join(';');
    }
    return str.replace(/^;+|;+$/, '');
  }).join(';');
}
