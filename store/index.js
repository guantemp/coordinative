import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
	state: { //全局参数
		token: '',
		userInfo: {},
	},
	getters: { //get方法
		// 判断用户是否登录
		hasLogin(state) {
			return !!state.token;
		}
	},
	mutations: { //set方法
		login(state, data) {
			console.log(data);
			console.log(data.token);
			state.token = data.token;
			state.userInfo = data.user;
			uni.setStorageSync('token', data.token);
			uni.setStorageSync('userInfo', data.user);
		},
		logout(state) {
			state.token = '';
			uni.removeStorageSync('token');
			setTimeout(()=>{
				state.userInfo = {};
				uni.removeStorageSync('userInfo');
			}, 1100)		
		}
	},
	actions: {
		async getUserInfo({
			state,
			data
		}) {
			
		}
	},
	modules: {
		//全局变量分组，所以需要写提前声明其他store文件，然后引入这里,格式与这个文件一样

	}
})

export default store
