<template>
	<view class="workflow">
		<view class="top">
			<text class="flow">业务工作台</text>
			<view class="store" @click="this.$util.navTo('/pages/workflow/store_selection')">
				<text class="iconfont icon-location"></text>
				<text class="txt">旺客隆超市国美绿洲店</text>
			</view>
		</view>
		<view class="item">
			<listCell icon="/static/workflow/item.png" title="商品" :arrow="false"/>
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
				<view class="cu-item" @tap.stop="this.$util.navTo('/pages/public/not_implemented')">
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
			<listCell icon="/static/workflow/order.png" title="采购" />
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
	import listCell from '@/components/list-cell';
	export default {
		components: {
			listCell,
			//'HMfilterDropdown': HMfilterDropdown
		},
		data() {
			return {
			}
		},
		onLoad: function() {},
		methods: {
			navBack() {
				uni.navigateBack();
			},
			location() {
				uni.getLocation({
					type: 'gcj02', //gcj02//wgs84
					success: res => {
						this.$util.toast('当前位置的经度：' + res.longitude + '\n当前位置的纬度：' + res.latitude);
					},
					fail: res => {
						this.$util.toast("获取位置失败，请手动选择。");
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
		z-index: 90;
		background: linear-gradient(45deg, #0081ff, #1cbbb4);
		height:210rpx;
		top:0rpx;

		.flow {
			padding-top: 78rpx;
			padding-left: 30%;
			font-size: 36rpx;
			text-shadow: 1px 0px 1px rgba(0, 0, 0, .3);
		}

		.store {
			font-size: 16rpx;
			color: #FFF;
			padding: 5rpx 20rpx;
			align-items: center;
			margin: 20rpx 0rpx;
			
			.txt{
				margin: 0rpx 10rpx;
				font-size: 30rpx;
			}
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
