export default {
	// #ifdef MP-WEIXIN
	data() {
		return {
			mpCodeTimer: 0,
			wxCode: '',
		}
	},
	computed: {
		//timerIdent() {
		//	return this.$store.state.timerIdent;
		//}
	},
	watch: {
		//timerIdent() {
		//	this.mpCodeTimer++;
		//	if (this.mpCodeTimer % 30 === 0) {
		//		this.getWxCode();
		//	}
		//}
	},
	onShow() {
		//this.getWxCode();
	},
	methods: {
		//微信小程序登录
		getUserInfo(userInfoData) {
			if (!userInfoData.detail.userInfo) {
				return;
			}
			this.getWxCode();
			if (!this.agreement) {
				this.$util.toast('请阅读并同意用户服务协议及隐私权协议');
				return;
			}
			this.$util.throttle(async () => {
				uni.getUserInfo({
					provider: 'weixin',
					success: async res => {
						await this.$http.post('/auth/v1/login', {
							params: {
								js_code: this.wxCode,
								//encryptedData: res.encryptedData,
								//iv: res.iv,
								//signature: res.signature,
								method: 'byShortcut',
								userInfo: JSON.parse(res.rawData)
							},
							custom: {loading: false},
						}).then(res => {
							if (res.data.code == 300) {
								uni.showModal({
									title: '绑定',
									content: '用户尚未绑定',
									confirmText: '去绑定',
									cancelText: '还是算了',
									success: function(r) {
										if (r.confirm) {
											console.log('用户点击确定');
											uni.navigateTo({
												url: '/pages/user/bindMobile?data=' + JSON.stringify(res.data)
											})
										} else if (r.cancel) {
											console.log('用户点击取消');
											uni.navigateBack();
										}
									}
								});
							} else {
								this.$store.commit('login', res.data);
								setTimeout(() => {
									uni.navigateBack();
								}, 1500)
							}
						}).catch(err => {
							this.$util.toast(`服务器离线，请稍后再试！`);
						});
						//this.$store.commit('login', {
						//token: true,
						//userInfo: JSON.parse(res.rawData)
						//});
					},
					fail: err => {
						this.$store.commit('logout');
					}
				})
			})
		},

		//获取code
		getWxCode() {
			uni.getProvider({
				service: 'oauth',
				success: res => {
					//console.log(res.provider)
					if (~res.provider.indexOf('weixin')) {
						uni.login({
							provider: 'weixin',
							success: res => {
								console.log(JSON.stringify(res));
								this.wxCode = res.code;
							}
						});
					}
				}
			});
		},
	}
	// #endif
}
