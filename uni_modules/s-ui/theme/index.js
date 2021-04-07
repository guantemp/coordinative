import themeState from './themeState';
// eslint-disable-next-line no-unused-vars
import themeData from './themeData';

/**
 * @name: 获取查看当前themeData
 * @return {themeData}
 */
export function getThemeData () {
  return themeState.data;
}

/**
 * @name: 替换theme
 * @param {themeData} theme
 * @return {void}
 */
export function changeTheme (theme) {
  themeState.data = Object.assign({}, themeState.data, theme);
}
