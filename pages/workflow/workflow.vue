<template>
	<view class="workflow">
		<navBar title="工作台" :backgroundColor="[1, ['#ec008c', '#6739b6', 60]]" surplusHeight="26"
			:titleFont="['#FFF','center',700]">
			<view slot="extendSlot" class="store" @click="this.$util.navTo('/pages/workflow/store_selection')">
				<text class="cuIcon-location txt"></text>
				<text class="txt">旺客隆超市国美绿洲店</text>
			</view>
		</navBar>
		<view class="item">
			<listCell decorateIcon="/static/workflow/item.png" title="商品" />
			<view class="cu-list grid col-4 no-border item_grid_list">
				<view class="cu-item " @tap.stop="this.$util.navTo('/pages/public/not_implemented')">
					<view class="text-red">
						<image class="item_img" src="/static/workflow/archives.png" />
					</view>
					<text>商品档案</text>
				</view>
				<view class="cu-item" @tap.stop="this.$util.navTo('/pages/workflow/price_adjustment_sheet')">
					<view class="text-red">
						<image class="item_img" src="/static/workflow/readjust.png" />
						<view class="cu-tag badge">
							<block>2</block>
						</view>
					</view>
					<text>调价</text>
				</view>
				<view class="cu-item" @tap.stop="this.$util.navTo('/pages/workflow/label/label')">
					<view class="text-red">
						<image class="item_img" src="/static/workflow/label_printer.png" />
					</view>
					<text>价签打印</text>
				</view>
				<view class="cu-item" @tap.stop="this.$util.navTo('/pages/public/not_implemented')">
					<view class="text-red">
						<image class="item_img" src="/static/workflow/promotion.png" />
					</view>
					<text>促销</text>
				</view>
			</view>
		</view>
		<view class="order">
			<listCell decorateIcon="/static/workflow/order.png" title="采购" />
			<view class="cu-list grid col-4 no-border item_grid_list">
				<view class="cu-item " @tap.stop="this.$util.navTo('/pages/public/not_implemented')">
					<view class="text-red">
						<image class="item_img" src="/static/workflow/purchase.png" />
					</view>
					<text>下单</text>
				</view>
				<view class="cu-item" @tap.stop="this.$util.navTo('/pages/public/not_implemented')">
					<view class="text-red">
						<image class="item_img" src="/static/workflow/put_in.png" />
						<view class="cu-tag badge">
							<block>10</block>
						</view>
					</view>
					<text>验收</text>
				</view>
				<view class="cu-item" @tap.stop="this.$util.navTo('/pages/public/not_implemented')">
					<view class="text-red">
						<image class="item_img" src="/static/workflow/chargeback.png" />
					</view>
					<text>退单</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad: function() {},
		methods: {
			navBack() {
				uni.navigateBack();
			},
		},
	}
</script>

<style scoped lang='scss'>
	.workflow {
		width: 100vw;
		height: 100vh;
		background-color: #F8F8F8;
	}

	.store {
		font-size: 16rpx;
		color: #FFF;
		padding: 10rpx 20rpx;
		align-items: center;

		.txt {
			margin: 0rpx 10rpx;
			font-size: 30rpx;
		}
	}


	.item {
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		padding: 20rpx 20rpx 0rpx 20rpx;
		background-color: #FFFFFF;
		margin: 20rpx 20rpx 0rpx 20rpx;

		.item_img {
			width: 64rpx;
			height: 64rpx;
		}

		.item_grid_list {
			padding: 20rpx 0rpx 0rpx 0rpx;
		}
	}

	.order {
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		padding: 20rpx 20rpx 0rpx 20rpx;
		background-color: #FFFFFF;
		margin: 20rpx 20rpx 0rpx 20rpx;

		.item_img {
			width: 64rpx;
			height: 64rpx;
		}

		.item_grid_list {
			padding: 20rpx 0rpx 0rpx 0rpx;
		}
	}
</style>
