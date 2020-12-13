<template>
	<view class="register">
		<view class="right-top-sign"></view>
		<view class="left-bottom-sign"></view>
		<text class="back-btn" :class="'cuIcon-close'" @click="navBack"></text>
		<view>
			<view class="left-top-sign">HI!</view>
			<view class="welcome">欢迎您的到来</view>
			<view class="input-content">
				<view class="cu-form-group form-group">
					<image class="from-img" src="/static/user/mobile.png" mode="aspectFit"></image>
					<!--<u-keyboard ref="uKeyboard" mode="number" @change="username_changed" @backspace="username_backspace" v-model="username_key"tips="请输入手机号"></u-keyboard>-->
					<input type="number" placeholder="请填写手机号码" name="input" v-model="username" maxlength="11"></input>
				</view>
				<view class="cu-form-group form-group">
					<image class="from-img" src="/static/user/verification.png" mode="aspectFit"></image>
					<input placeholder="请填写手机验证码" name="input" v-model="code"></input>
					<text @click="sendCode" v-if="!sendCodeDisable">获取验证码</text>
					<text v-else>{{codeSeconds}}秒</text>
				</view>
				<view class="cu-form-group form-group">
					<image class="from-img" src="/static/user/password.png" mode="aspectFit"></image>
					<input placeholder="请填写密码(6-16位包含数字和字母)" name="input" password v-model="password"></input>
				</view>
				<view class="cu-form-group form-group">
					<image class="from-img" src="/static/user/password.png" mode="aspectFit"></image>
					<input placeholder="请再填写一次密码" name="input" password></input>
				</view>
				<view class="second_line" />
				<view class="agreement">
					<u-checkbox shape="circle" icon-size="24rpx" label-size="26rpx" active-color="red" label-disabled="false" v-model="agreement">我已阅读并同意
						<text class="tit" @click="navToAgreementDetail(1)">《用户服务协议》</text>
						<text class="tit" @click="navToAgreementDetail(2)">《隐私权政策》</text>
					</u-checkbox>
				</view>
				<u-button ref="register" shape="circle" type="warning" plan marginTop="60rpx" @click="register">注册</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import Request from '../../js_sdk/luch-request/luch-request/index.js' // 下载的插件
	
	const http = new Request();
	export default {
		data() {
			return {
				agreement: true,
				username: '',
				password: '',
				code: '',
				sendCodeDisable: false,
				codeSeconds: 0,
				countDown: 10,
			}
		},

		methods: {
			sendCode() {
				if (!this.$u.test.mobile(this.username)) {
					this.$u.toast('请输入正确的手机号码');
					return;
				}
				http.post('http://demo.rageframe.com/api/tiny-shop/v1/site/sms-code', {
						mobile: this.username,
						usage: 'register'
					}).then(res => {
						if (res.data.code == 200) {
							this.$util.toast(`验证码发送成功, 验证码是${res.data.data}`);
						} else {
							this.$util.toast(res.data.message);
						}
					}).catch(err => {
							console.log(err);
					});
				this.handleSmsCodeTime(this.countDown);
			},
			handleSmsCodeTime(time) {
				let timer = setInterval(() => {
					if (time === 0) {
						clearInterval(timer);
						this.sendCodeDisable = false;
					} else {
						this.codeSeconds = time;
						this.sendCodeDisable = true;
						time--;
					}
				}, 1000);
			},
			navBack() {
				uni.navigateBack();
			},
			//同意协议
			checkAgreement() {
				this.agreement = !this.agreement;
			},
			register() {

			},
			//打开协议
			navToAgreementDetail(type) {
				console.log(type);
				uni.navigateTo({

				})
			},
		}
	}
</script>

<style scoped lang='scss'>
	.register {
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
		}

		.from-img {
			width: 54rpx;
			height: 54rpx;
			margin-right: 30rpx;
		}

		.second_line {
			vertical-align: middle;
			border-bottom: solid 2upx #e8e8e8;
			margin-bottom: 56rpx;
		}

		.agreement {
			left: 0;
			z-index: 1;
			width: 750rpx;
			height: 90rpx;
			color: #999;
			font-size: 26rpx;

			.tit {
				color: #40a2ff;
			}
		}
	}

	.other-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 80rpx;

		.icon {
			width: 80rpx;
			height: 80rpx;
			margin-top: 40rpx;
		}
	}
</style>

