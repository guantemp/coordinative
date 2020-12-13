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
						console.log(this.wxCode);
						await this.$http.get('/egde/v1/wxAuth', {
							params: {
								js_code: this.wxCode,
								encryptedData: res.encryptedData,
								iv: res.iv,
								signature: res.signature,
								//userInfo: JSON.parse(res.rawData)
							}
						}).then(res => {
							console.log(res);
						}).catch(err => {
							this.$util.toast(`服务器离线，请稍后再试！`);
						});
						//this.$store.commit('login', {
							//token: true,
							//userInfo: JSON.parse(res.rawData)
						//});
						uni.navigateBack();
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
