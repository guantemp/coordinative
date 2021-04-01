import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

let _debounceTimeout = null,
	_throttleRunning = false

/**
 * 节流
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms  
 */
export const throttle = (fn, delay = 500) => {
	if (_throttleRunning) {
		return;
	}
	_throttleRunning = true;
	fn();
	setTimeout(() => {
		_throttleRunning = false;
	}, delay);
}

/**
 * 防抖
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms   
 */
export const debounce = (fn, delay = 500) => {
	clearTimeout(_debounceTimeout);
	_debounceTimeout = setTimeout(() => {
		fn();
	}, delay);
}
//简化的toast
export const toast = (title, duration = 3000, mask = false, icon = 'none') => {
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

export const hasLogin = (options = {}) => {
	const token = uni.getStorageSync('accessToken');
	if (token) {
		return true;
	}
	if (options.nav !== false) {
		uni.navigateTo({
			url: '/pages/user/auth/login'
		})
	}
	return false;
}

export const navTo = (url) => {
	uni.navigateTo({
		url
	})
}

const navBack = function(){
	uni.navigateBack();
}

export const checkMobile = (val) => {
	return /^[1](([3][0-9])|([4][5,7,9])|([5][^4,6,9])|([6][6])|([7][3,5,6,7,8])|([8][0-9])|([9][8,9]))[0-9]{8}$/
		.test(
			val);
}

export const checkPassword = (val) => {
	return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/.test(val);
	//(?=.*[~@#$%\*-\+=:,\\?\[\]\{}]) 如果需要特殊字符加上
}
export const checkSmsCode = (val) => {
	return /^\d{6,6}$/.test(val);
}
export const checkEmail = (val) => {
	return /^\\s*\\w+(?:\\.{0,1}[\\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\\.[a-zA-Z]+\\s*$/.test(val);
}
