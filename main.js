import Vue from 'vue'
import App from './App'

import store from './store';

//引入全局request
import http from './js_sdk/luch-request/luch-request/luch-request.js'
import {
	toast,
	navto,
	throttle,
	debounce
} from './js_sdk/util.js';

//挂载全局方法
Vue.prototype.$store = store;
Vue.prototype.$util = {
	toast,
	navto,
	throttle,
	debounce
};
Vue.prototype.$http = http;
//小程序页面组件和这个 App.vue 组件的写法和引入方式是一致的，为了区分两者，需要设置mpType值
App.mpType = 'app'
const app = new Vue({
	...App,
	store: store,
})
app.$mount()
