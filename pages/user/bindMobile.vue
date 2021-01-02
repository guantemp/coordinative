<template>
	<view class="login">
		<view class="right-top-sign"></view>
		<view class="left-bottom-sign"></view>
		<text class="back-btn" :class="'cuIcon-close'" @click="navBack"></text>
		<view>
			<view class="left-top-sign">BIND</view>
			<view class="welcome">用户绑定！</view>
			<view class="input-content">
				<view class="cu-form-group form-group">
					<text class="iconfont icon-mobile from-tit"></text>
					<input type="number" placeholder="请填写手机号码" name="input" v-model="mobile" maxlength="11" @input="check(mobile,smsCode)"></input>
				</view>
				<view class="cu-form-group form-group">
					<text class="iconfont icon-captcha from-tit"></text>
					<input placeholder="请填写手机验证码" name="input" type="number" v-model="smsCode" maxlength="6" @input="check(mobile,smsCode)"></input>
					<button class="cu-btn smsBtn" :class="sendCodeBtnDisable?'':'smsBtnEnable'" @click.self.stop="sendSmsCode"
					 :disabled="sendCodeBtnDisable">
						<text v-if="!sendCodeTitDisable">获取验证码</text>
						<text v-else>{{codeSeconds}}秒</text>
					</button>
				</view>
				<view class="second_line" />
				<view class="flex-sub">
					<view class="solid-bottom text-xs padding">
						<text class="text-gray">温馨提示：如果你输入的手机号码尚未注册，系统将注册一个新账户，并绑定该微信号</text>
					</view>
				</view>
				<button class="cu-btn bg-brown lg confirmBtn" :disabled="confirmBtnDisabled" @click.self.stop="login">绑定用户</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		checkMobile,
		checkSmsCode
	} from '../../js_sdk/util.js';
	export default {
		data() {
			return {
				mobile: '',
				smsCode: '',
				confirmBtnDisabled: true,
				sendCodeTitDisable: false,
				sendCodeBtnDisable: true,
				codeSeconds: 0,
				countDown: 59,
			}
		},

		methods: {
			async register() {
				if (!checkSmsCode(this.smsCode)) {
					this.$util.toast('验证码格式不正确！');
					return;
				}
				if (checkMobile(mobile)) {
					this.$util.toast('手机号码不正确！');
					return;
				}
				await this.$http
					.post('/auth/v1/user', {
						username: this.mobile,
						code: this.smsCode,
						unionId:'',
						thirdPartyName:'WEIXIN',
						method: 'bind'
					})
					.then(res => {
						if (res.data.code != 200) {
							this.$util.toast(res.data.message);
						} else {
							this.$util.toast('绑定成功,正在跳转登录...');
							setTimeout(() => {
								this.$util.navTo('/pages/user/login');;
							}, 1500)
						}
					})
					.catch(err => {
						this.$util.toast(`服务器离线，请稍后再试！`);
					});
			},
			navBack() {
				uni.navigateBack();
			},
			check(mobile, smsCode) {
				if (checkMobile(mobile)) {
					this.sendCodeBtnDisable = false;
					if (checkSmsCode(smsCode)) {
						this.confirmBtnDisabled = false;
					} else {
						this.confirmBtnDisabled = true;
					}
				} else {
					this.sendCodeBtnDisable = true;
					this.confirmBtnDisabled = true;
				}
			},
			async sendSmsCode() {
				await this.$http.get('/auth/v1/sms', {
					params: {
						mobile: this.mobile
					}
				}).then(res => {
					if (res.data.code == 200) {
						this.$util.toast(`验证码已发送`, 2000, false, success);
						this.handleSmsCodeTime(this.countDown);
					} else {
						this.$util.toast(res.data.message);
					}
				}).catch(err => {
					console.log(err);
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
		padding: 0rpx 40rpx;

		.form-group {
			padding: 0rpx 10rpx;
		}

		.smsBtn {
			background: transparent;
			border-width: 0px;
			outline: none;
		}

		.smsBtnEnable {
			color: #2b85e4;
		}

		.from-img {
			width: 54rpx;
			height: 54rpx;
			margin-right: 30rpx;
		}

		.from-tit {
			font-size: 60rpx;
			margin-right: 30rpx;
			color: #555555;
		}

		.second_line {
			vertical-align: middle;
			border-bottom: solid 2upx #e8e8e8;
			margin-bottom: 16rpx;
		}

		.confirmBtn {
			width: 98%;
		}
	}
</style>
