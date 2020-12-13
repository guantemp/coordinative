<template>
	<view class="login">
		<view class="right-top-sign"></view>
		<view class="left-bottom-sign"></view>
		<text class="back-btn" :class="'cuIcon-close'" @click="navBack"></text>
		<view>
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">欢迎回来！</view>
			<view class="input-content">
				<view class="cu-form-group form-group">
					<image class="from-img" src="/static/user/mobile.png" mode="aspectFit"></image>
					<input type="number" placeholder="请填写手机号码" name="input" v-model="mobile" maxlength="11" @input="check(mobile,smsCode,password)"></input>
				</view>
				<view v-if="verification" class="cu-form-group form-group">
					<image class="from-img" src="/static/user/verification.png" mode="aspectFit"></image>
					<input placeholder="请填写手机验证码" name="input" type="number" v-model="smsCode" maxlength="6" @input="check(mobile,smsCode,password)"></input>
					<button class="cu-btn no-border" @click.self.stop="sendSmsCode" :disabled="sendCodeBtnDisable">
						<text v-if="!sendCodeTitDisable">获取验证码</text>
						<text v-else>{{codeSeconds}}秒</text>
					</button>
				</view>
				<view v-else class="cu-form-group form-group">
					<text class="iconfont icon-password from-tit"></text>
					<input placeholder="请填写密码" name="input" password v-model="password" maxlength="16" @input="check(mobile,smsCode,password)"></input>
				</view>
				<view class="second_line" />
				<button class="cu-btn bg-cyan lg confirmBtn" :class="confirmBtnDisabled?'line-blue':''" :disabled="confirmBtnDisabled"
				 @click.self.stop="login">登录</button>
			</view>
			<view class="other-wrapper">
				<u-divider>快捷登录</u-divider>
				<view class="shortcut">
					<image @click="convert" v-if="verification" class="img" src="/static/user/password_01.png"></image>
					<image @click="convert" v-else class="img" src="/static/user/tel.png"></image>
					<!-- #ifdef MP-WEIXIN -->
					<button class="btn" plain open-type="getUserInfo" @getuserinfo="getUserInfo">
						<image class="img" src="/static/user/wx.png"></image>
					</button>
					<!--#endif-->
					<!--
					<image class="img" src="/static/user/weibo.png"></image>
					<image class="img" src="/static/user/GitHub.png"></image>
					-->
				</view>
			</view>
			<view class="appendix">
				<text @click="this.$util.navTo('/pages/user/password')">找回密码</text>
				<text class="appendix-split">|</text>
				<text @click="this.$util.navTo('/pages/user/register')">注册账号</text>
			</view>
			<view class="agreement">
				<u-checkbox shape="circle" icon-size="24rpx" label-size="26rpx" active-color="red" label-disabled="false" v-model="agreement">我已阅读并同意
					<text class="tit" @click="this.$util.navTo('/pages/public/not_implemented')">《用户服务协议》</text>
					<text class="tit" @click="this.$util.navTo('/pages/public/not_implemented')">《隐私权政策》</text>
				</u-checkbox>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		checkMobile,
		checkPassword,
		checkSmsCode
	} from '../../js_sdk/util.js';
	import wxLogin from '../../js_sdk/wechatLogin.js'
	export default {
		mixins: [wxLogin],
		data() {
			return {
				agreement: true,
				mobile: '',
				password: '',
				smsCode: '',
				verification: false,
				sendCodeTitDisable: false,
				sendCodeBtnDisable: true,
				codeSeconds: 0,
				countDown: 59,
				confirmBtnDisabled: true,
			}
		},

		methods: {
			check(mobile, smsCode, password) {
				if (checkMobile(mobile)) {
					this.sendCodeBtnDisable = false;
					if (this.verification && checkSmsCode(smsCode)) {
						this.confirmBtnDisabled = false;
					} else if (!this.verification && checkPassword(password)) {
						this.confirmBtnDisabled = false;
					} else {
						this.confirmBtnDisabled = true;
					}
				} else {
					this.sendCodeBtnDisable = true;
					this.confirmBtnDisabled = true;
				}
			},
			convert() {
				this.verification = !this.verification;
				this.check(this.mobile, this.smsCode, this.password);
			},
			async sendSmsCode() {
				await this.$http.get('/egde/v1/sms', {
					params: {
						mobile: this.mobile
					}
				}).then(res => {
					if (res.data.code == 200) {
						this.$util.toast(`验证码已发送`, 3000, false, success);
						this.handleSmsCodeTime(this.countDown);
					} else {
						this.$util.toast(res.data.msg);
					}
				}).catch(err => {
					this.$util.toast(`服务器离线，请稍后再试！`);
				});
			},
			handleSmsCodeTime(time) {
				let timer = setInterval(() => {
					if (time === 0) {
						clearInterval(timer);
						this.sendCodeTitDisable = false;
					} else {
						this.codeSeconds = time;
						this.sendCodeTitDisable = true;
						time--;
					}
				}, 1000);
			},

			//登录
			async login() {
				if (!this.agreement) {
					this.$util.toast('请阅读并同意用户服务协议及隐私权协议');
					return;
				}
				await this.$http
					.post('/egde/v1/sms', {
						mobile: this.mobile,
						smsCode: this.smsCode
					})
					.then(res => {
						if (res.data.code == 200) {
							this.$util.toast('登录成功，欢迎回来！');
							//this.$store.commit('setToken', data);
							setTimeout(() => {
								uni.navigateBack();
							}, 1500)
						} else {
							this.$util.toast(res.data.msg);
						}
					})
					.catch(err => {
						this.$util.toast(`服务器离线，请稍后再试！`);
					});
			},
			navBack() {
				uni.navigateBack();
			},
			//同意协议
			checkAgreement() {
				this.agreement = !this.agreement;
			},
		}
	}
</script>

<style scoped lang='scss'>
	.login {
		padding-top: 15vh;
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}

	.right-top-sign {
		position: absolute;
		top: 80rpx;
		right: -30rpx;
		z-index: 95;

		&:before,
		&:after {
			display: block;
			content: "";
			width: 400rpx;
			height: 80rpx;
			background: #b4f3e2;
		}

		&:before {
			transform: rotate(50deg);
			border-top-right-radius: 50px;
		}

		&:after {
			position: absolute;
			right: -198rpx;
			top: 0;
			transform: rotate(-50deg);
			border-top-left-radius: 50px;
		}
	}

	.left-bottom-sign {
		position: absolute;
		left: -270rpx;
		bottom: -320rpx;
		border: 100rpx solid #d0d1fd;
		border-radius: 80%;
		padding: 180rpx;
	}

	.back-btn {
		position: absolute;
		left: 20rpx;
		top: calc(var(--status-bar-height) + 20rpx);
		z-index: 90;
		padding: 20rpx;
		font-size: 32rpx;
		color: #606266;
	}

	.left-top-sign {
		font-size: 120rpx;
		color: #f8f8f8;
		position: relative;
		left: -12rpx;
	}

	.welcome {
		position: relative;
		left: 50rpx;
		top: -90rpx;
		font-size: 46rpx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0, 0, 0, .3);
	}

	.input-content {
		padding: 0rpx 50rpx;

		.form-group {
			padding: 0rpx 10rpx;
			color: #2b85e4;

			button.plain {
				border: none;
			}
		}

		.from-img {
			width: 54rpx;
			height: 54rpx;
			margin-right: 30rpx;
		}

		.from-tit {
			font-size: 64rpx;
			margin-right: 30rpx;
			color: #555555;
		}

		.second_line {
			vertical-align: middle;
			border-bottom: solid 2upx #e8e8e8;
			margin-bottom: 56rpx;
		}

		.confirmBtn {
			width: 98%;
		}
	}

	.other-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 80rpx;

		.shortcut {
			display: flex;
			width: 320rpx;
			justify-content: space-around;
			margin-top: 20rpx;
			margin-bottom: 40rpx;
		}

		.btn {
			border: 0;
			padding: 0rpx;
			margin: 0rpx;

			&:after {
				border: 0;
			}
		}

		.img {
			width: 80rpx;
			height: 80rpx;
		}
	}

	.appendix {
		display: flex;
		justify-content: center;
		margin-top: 60rpx;

		.appendix-split {
			margin-right: 20rpx;
			margin-left: 20rpx;
		}
	}

	.agreement {
		position: absolute;
		left: 0;
		bottom: 6vh;
		z-index: 1;
		width: 750rpx;
		height: 90rpx;
		color: #999;
		font-size: 26rpx;
		text-align: center;

		.tit {
			color: #40a2ff;
		}
	}
</style>
