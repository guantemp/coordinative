/*
 * @Description: 主题theme混入
 * @Author: 无痕
 * @Email: 350801869@qq.com
 * @Date: 2021-02-23 14:35:39
 * @LastEditTime: 2021-02-28 16:06:52
 * @LastEditors: 无痕
 */
import themeState from './themeState';
import { changeTheme } from './index';

const themeKey = '[S_THEME_DATA]';
const colorRegExp = /{([^{}}]+)}/g;

const themeMixin = {
  data () {
    return {
      [themeKey]: themeState
    };
  },
  methods: {
    /**
     * @name: 根据theme变量获取颜色
     * @param {String} color
     * @return {String}
     * @example this.$Theme('{primary}')
     */
    $sTheme (color) {
      const colorKey = String(color);
      if (colorKey.match(colorRegExp)) {
        return colorKey.replace(/{([^{}}]+)}/g, (_str, k) => {
          return themeState.data[k] || k;
        });
      }
      return color;
    },
    $sChangeTheme: changeTheme
  }
};

export default themeMixin;
