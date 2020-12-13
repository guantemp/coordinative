<template>
	<view class="content">
		<text class="tit">未实现，请等待....</text>
		<button class="cu-btn bg-cyan lg shadow confirmBtn" @click="navBack()">返回</button>
	</view>
</template>

<script>
	export default {
		methods: {
			navBack() {
				uni.navigateBack();
			}
		},
	}
</script>

<style lang="scss">
	.content{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 420rpx;
	}
	.tit {
		width: 100%;
		font-size: 36rpx;
		text-align: center;
		margin-bottom: 80rpx;
	}

	.confirmBtn {
		width: 95vw;
	}
</style>
