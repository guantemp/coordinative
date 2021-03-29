<template>
	<view class="price_adjustment_sheet">
		<navBar title="调价单" :backgroundColor="[1, ['#24bdab', '#80c54c', 45]]"
			backgroundImg="/static/workflow/blue_back.png" :titleFont="['#FFF','center',700]" surplusHeight="75">
			<view slot="extendSlot">
				<text class="iconfont icon-lookup searchIcon"></text>
				<input type="text" class="input" placeholder-style="color:#dbdbdb;" confirm-type="search"
					placeholder="请输入单据号/商品条码" @confirm="searchConfirm" :style="{'height':'32px'}" />
			</view>
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
	
	.searchIcon {
		position: absolute;
		left: 18rpx;
		font-size: 30rpx;
		color: #dbdbdb;
	}

	.input {
		width: 88%;
		border-radius: 24rpx;
		background-color: #F8F8F8;//rgba(32, 32, 32, .35);
		padding: 0 26rpx 0 60rpx;
		color: #dbdbdb;
		text-overflow: ellipsis;
	}
</style>
