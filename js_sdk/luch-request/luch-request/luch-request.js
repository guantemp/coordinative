/**
 * luch-request 的全局配置
 */
import Request from './index.js'

const getTokenStorage = () => {
	let token = ''
	try {
		token = uni.getStorageSync('token')
	} catch (e) {}
	return token
}

const http = new Request()
http.setConfig((config) => { /* 设置全局配置 */
	config.baseURL = 'https://hoprxi.ngrok2.xiaomiqiu.cn' /* 根域名设置 */
	config.header = {
		...config.header,
		a: 1, // 演示
		b: 2 // 演示
	}
	config.custom = {
		// auth: false, // 是否传token
		loading: true // 是否使用loading
	}
	return config
})


http.interceptors.request.use((config) => { /* 请求之前拦截器。可以使用async await 做异步操作 */
	config.header = {
		...config.header,
		token: getTokenStorage()
	}
	/*
 if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
   return Promise.reject(config)
 }
 */
	if (config.custom.loading) {
		uni.showLoading({
			title: "加载中..."
		})
	}
	return config
}, (config) => {
	return Promise.reject(config)
})


http.interceptors.response.use(async (response) => { /* 请求之后拦截器。可以使用async await 做异步操作  */
	// if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
	//   return Promise.reject(response)
	// }
	if (response.config.custom.loading) {
		setTimeout(() => {
			uni.hideLoading()
		}, 1500)
	}
	return response
}, (response) => { // 请求错误做点什么。可以使用async await 做异步操作
	if (response.config.custom.loading) {
		uni.hideLoading()
	}
	return Promise.reject(response)
})

export default http
