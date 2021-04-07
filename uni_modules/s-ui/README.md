# s-ui

## uni-app uni_modules，有组件，工具方法和一些个人封装

### [代码地址](https://gitee.com/sldt/s-ui)   [查看演示](https://sldt.gitee.io/s-ui/)

## 使用说明

``` js
// main.js中引入
import Vue from 'vue';
import sUi from '@/uni_modules/s-ui';

Vue.use(sUi, {
  // 是否给页面page全局混入一个onEmitPage钩子，使用this.$emitPage(pagePath,...args)触发
  useEmitPageMixin: true,
  // 替换uni默认的showLoading,hideLoading
  replaceUniLoading: true,
  // 替换uni默认的showToast,hideToast
  replaceUniToast: true,
  // 替换uni默认的showModal
  replaceUniModal: true,
  // 主题变量更改和追加，使用this.$sTheme('{primary}')
  theme: {
    parmay: 'blue'
  }
});

// 替换uni默认的showLoading,showToast，showModal需在页面上引入<s-toast/> <s-dialog/>
// 推荐直接使用<s-page page-class="Home-Page">slot</s-page>

// 使用主题变量
this.$sTheme('{primary}');

// 查看当前的themData
sUi.getThemeData();

// 更改主题变量
this.$sChangeTheme({
  parmay: 'blue'
});

sUi.changeTheme({
  parmay: 'blue'
})
```

### 基础样式

``` scss
@import "@/uni_modules/s-ui/styles/index.scss";
```

### 组件在page.json中使用easycom引入

``` json
"easycom": {
  "^s-(.*)": "@/uni_modules/s-ui/components/s-$1/s-$1.vue"
}
```

### 工具方法使用

``` js
import formatDate "@/uni_modules/s-ui/utils/formatDate";
```

### 封装接口请求

``` js
import createRequest "@/uni_modules/s-ui/plugins/createRequest";

// 简单使用
const request = createRequest({
  baseURL: 'https://www.baidu.com'
})

// 使用方式
request.get('/xxx/xxx', {
  a: 1,
  b: 2
}, {
  loadingText: '请求中'
}).then(res => {
  console.log(res.data)
}).catch(err => {
  console.log(err.message)
})

// 全部默认参数
const request = createRequest({
  // uni自带
  header: {}, // 请求头
  method: 'GET', // 请求方式
  url: '', // 接口路径
  timeout: 20 * 1000, // 超时时间
  // 自定义添加
  baseURL: '', // 域名
  urlParams: {}, // 接口路径中的参数
  useDefaultLoading: true, // 是否使用自定义内置loading
  showLoading: true, // 是否显示加载loading
  loadingText: '请求中', // loading 文字
  loadingTime: 200, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
  useDefaultToast: true, // 是否使用自定义内置toast
  toastTime: 2000, // 提示时间
  showError: true, // 是否显示错误提示
  delayTime: 0, // 延时多久发起请求
  getTask(task) {}, // 获取请求返回对象
  // 判断请求状态是成功还是失败
  validateStatus(response) {
    return response.statusCode === 200;
  }
}, {
  /**
   * @name: 发起请求前拦截器
   * @param {object} options
   * @return {object|void}
   */
  request(options) {
    return options;
  },
  /**
   * @name: 请求成功拦截器
   * @param {object}
   * @return {object}
   */
  success({
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
  fail({
    options,
    error,
    createError
  }) {
    return error;
  }
})
```
