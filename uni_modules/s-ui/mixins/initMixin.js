/*
 * @Description: 初始化混入
 * @Author: 无痕
 * @Email: 350801869@qq.com
 * @Date: 2021-02-23 14:35:39
 * @LastEditTime: 2021-02-25 10:46:36
 * @LastEditors: 无痕
 */
import toast from '../utils/toast';

const initMixin = {
  onLoad () {
    toast.clear();
  },
  onUnload () {
    toast.clear();
  }
};

export default initMixin;
