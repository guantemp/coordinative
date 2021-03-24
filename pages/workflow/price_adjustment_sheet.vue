<template>
	<view class="price_adjustment_sheet">
		<navBar title="调价单" :backgroundColor="[1, ['#24bdab', '#80c54c', 45]]"
			backgroundImg="/static/workflow/blue_back.png" :titleFont="['#FFF','center',700]">
		</navBar>
	</view>
</template>

<script>
	import navBar from '@/components/navBar/navBar.vue';
	export default {
		components: {
			navBar
			//'HMfilterDropdown': HMfilterDropdown
		},
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
