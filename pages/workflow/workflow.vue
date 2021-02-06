<template>
	<view class="workflow">
		<view class="top">
			<image class="top-bg" src="/static/workflow/blue_back.jpeg"></image>
			<text class="center">业务流</text>
		</view>
		<view class="item">
			<listCell icon="/static/workflow/item.png" title="商品" />
			<view class="cu-list grid col-4 no-border item_grid_list">
				<view class="cu-item " @tap.stop="this.$util.navTo('/pages/public/not_implemented')">
					<view class="text-red">
						<image class="item_img" src="/static/workflow/archives.png" />
					</view>
					<text>商品档案</text>
				</view>
				<view class="cu-item" @tap.stop="this.$util.navTo('/pages/public/not_implemented')">
					<view class="text-red">
						<image class="item_img" src="/static/workflow/readjust.png" />
						<view class="cu-tag badge">
							<block>2</block>
						</view>
					</view>
					<text>调价单</text>
				</view>
				<view class="cu-item" @tap.stop="this.$util.navTo('/pages/public/not_implemented')">
					<view class="text-red">
						<image class="item_img" src="/static/workflow/label_printer.png" />
					</view>
					<text>标价签</text>
				</view>
				<view class="cu-item" @tap.stop="this.$util.navTo('/pages/public/not_implemented')">
					<view class="text-red">
						<image class="item_img" src="/static/workflow/promotion.png" />
					</view>
					<text>促销单</text>
				</view>
			</view>
		</view>
		<view class="order">
			<listCell icon="/static/workflow/order.png" title="采购" />
			<view class="cu-list grid col-4 no-border item_grid_list">
				<view class="cu-item " @tap.stop="this.$util.navTo('/pages/public/not_implemented')">
					<view class="text-red">
						<image class="item_img" src="/static/workflow/purchase.png" />
					</view>
					<text>订单</text>
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
	import listCell from 'components/list-cell';
	export default {
		components: {
			listCell,
		},
		methods: {
			navBack() {
				uni.navigateBack();
			}
		},
	}
</script>

<style scoped lang='scss'>
	.workflow {
		width: 100vw;
		height: 100vh;
		background-color: #F8F8F8;
	}

	.top {
		display: flex;
		align-items: center;
		margin-top: var(--status-bar-height);
		z-index: 90;
		font-size: 32rpx;
		font-weight:bold;

		.center {
			padding-top: 20rpx;
			padding-left: 35%;
		}

		.top-bg {
			position: absolute;
			min-width: 100vw;
			top: 0rpx;
			height: 200rpx;
			opacity: .7;
		}
	}

	.item {
		display: flex;
		flex-direction: column;
		height: 260rpx;
		border-radius: 20rpx;
		padding: 20rpx 20rpx 0rpx 20rpx;
		background-color: #FFFFFF;
		margin: 108rpx 20rpx 0rpx 20rpx;

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
		height: 260rpx;
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
