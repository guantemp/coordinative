<template>
	<view class="price_adjustment_sheet">
		<view class="top">
			<text class="back-btn iconfont icon-left_arrow" :class="'cuIcon-close'" @click="navBack"></text>
			<text class="center">调价单</text>
			<view class="cu-bar search bg-white">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="按条码品名拼音搜索商品"
					 confirm-type="search"></input>
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow-blur round">过滤</button>
				</view>
			</view>
			<image class="top-bg" src="/static/workflow/blue_back.png"></image>
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
	.price_adjustment_sheet {
		width: 100vw;
		height: 100vh;
		background-color: #F8F8F8;
	}

	.top {
		display: flex;
		flex-direction: column;
		margin-top: var(--status-bar-height);
		z-index: 90;

		.back-btn {
			position: absolute;
			left: 10rpx;
			top: calc(var(--status-bar-height) + 7rpx);
			z-index: 90;
			padding: 20rpx;
			font-size: 32rpx;
			color: #606266;
		}

		.center {
			padding-top: 20rpx;
			padding-left: 35%;
			font-size: 32rpx;
			font-weight: bold;
		}



		.top-bg {
			position: absolute;
			min-width: 100vw;
			top: 0rpx;
			height: 230rpx;
			opacity: .7;
		}
	}
</style>
