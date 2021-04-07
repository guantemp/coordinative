import systemInfo from './systemInfo';

/**
 * @name: 适配屏幕
 * @param {Number} size 尺寸
 * @param {Number} styleWidth 设计稿尺寸，默认750
 * @return {Number}
 */
export default function shfitSize (size, styleWidth = 750) {
  return parseInt(size / (styleWidth / systemInfo.windowWidth));
}
