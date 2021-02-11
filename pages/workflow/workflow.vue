<template>
	<view class="workflow">
		<view class="top">
			<image class="top-bg" src="/static/workflow/blue_back.jpeg"></image>
			<text class="center">业务流</text>
			<view class="store">
				<text class="iconfont icon-shop">嘉鱼超市</text>
				<view @click="location"><text class="iconfont icon-location">起源店</text></view>
				<button @click="location">点我</button>
			</view>
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
			},
			location() {
				uni.getLocation({
					type: 'gcj02',//gcj02//wgs84
					success: function(res) {
						this.$util.toast('当前位置的经度：' + res.longitude+'\n当前位置的纬度：' + res.latitude);
					},
					fail: function(res) {
						this.$util.toast("wqrwqe");
					},
				});

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
		flex-direction: column;
		margin-top: var(--status-bar-height);
		z-index: 90;

		.center {
			padding-top: 20rpx;
			padding-left: 35%;
			font-size: 32rpx;
			font-weight: bold;
		}

		.store {
			display: flex;
			justify-content: space-between;
			font-size: 16rpx;
			margin-top: 30rpx;
			padding: 0rpx 20rpx;
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
		margin: 48rpx 20rpx 0rpx 20rpx;

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
