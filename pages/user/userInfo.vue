<template>
	<view class="login">
		<view class="right-top-sign"></view>
		<view class="left-bottom-sign"></view>
		<text class="back-btn" :class="'cuIcon-close'" @click="navBack"></text>
		<view>
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">欢迎回来！</view>
			<button>退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			navBack() {
				uni.navigateBack();
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
</style>
