<template>
	<view class="price_adjustment_datails">
		<navBar title="调价明细" :backgroundColor="[1, ['#9000ff', '#5e00ff', 180]]" tabPage="/pages/index/index"
			:titleFont="['#FFF']"></navBar>
		<scroll-view scroll-y :scroll-with-animation="true" :enable-back-to-top="true"
			:style="{height:'calc(98vh - 98px - 8rpx)'}">
			<block v-for="(item,index) in items" :key="index">
				<view class="item bg-white">
					<view class='name padding-lr-sm padding-top-sm'>
						<text class="text-bold">品名：{{items[index].name}}</text>
						<view>
							<text class="cuIcon-edit text-red margin-right-sm" @click='edit(items[index].id)'></text>
							<text class="cuIcon-delete text-blue" @click="del(items[index].id)"></text>
						</view>
					</view>
					<view class="enclosure padding-lr-sm padding-tb-xs dashed-bottom">
						<text v-if="items[index].barcode">商品条码：{{items[index].barcode}}</text>
						<text v-if="items[index].plu">plu号：{{items[index].plu}}</text>
						<text>规格：{{items[index].specs}}</text>
					</view>
					<view
						v-if="(items[index].salePrice&&items[index].memberPrice)||(items[index].salePrice&&items[index].vipPrice)||(items[index].memberPrice&&items[index].vipPrice)"
						class='grid-item-container dashed-bottom padding-tb-xs'>
						<view class='grid-item-child-3 padding-left solid-right solid-bottom'>
							<text>原零售价</text>
							<text
								class="text-lg text-bold text-cyan text-price  padding-tb-xs">{{items[index].salePrice.old||'--'}}</text>
						</view>
						<view class='grid-item-child-3 padding-left solid-right solid-bottom'>
							<text>原会员价</text>
							<text
								class="text-lg text-bold text-cyan text-price  padding-tb-xs">{{items[index].memberPrice.old||'--'}}</text>
						</view>
						<view class='grid-item-child-3 padding-left solid-bottom'>
							<text>原VIP价</text>
							<text
								class="text-lg text-bold text-cyan text-price  padding-tb-xs">{{items[index].vipPrice.old||'--'}}</text>
						</view>
						<view class='grid-item-child-3 padding-left solid-right'>
							<text class="padding-tb-xs">现零售价</text>
							<text
								class="text-lg text-bold text-red text-price">{{items[index].salePrice.new||'--'}}</text>
						</view>
						<view class='grid-item-child-3 padding-left solid-right '>
							<text class="padding-tb-xs">现会员价</text>
							<text
								class="text-lg text-bold text-red text-price">{{items[index].memberPrice.new||'--'}}</text>
						</view>
						<view class='grid-item-child-3 padding-left'>
							<text class="padding-tb-xs">现VIP价</text>
							<text
								class="text-lg text-bold text-red text-price">{{items[index].vipPrice.new||'--'}}</text>
						</view>
					</view>
					<view v-else class='grid-item-container'>
						<view class='grid-item-child-2 dashed-right padding-left-xl test'>
							<text>原零售价</text>
							<text class="text-lg text-bold text-cyan text-price">{{items[index].salePrice.old}}</text>
						</view>
						<view class='grid-item-child-2 padding-left-xl padding-tb-xs'>
							<text>现零售价</text>
							<text class="text-lg text-bold text-orange text-price">{{items[index].salePrice.new}}</text>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
		<!--bootom-->
		<view class="bottom cu-bar bg-white tabbar border">
			<button class="action" open-type="contact">
				<view class="cuIcon-service text-green">
					<view class="cu-tag badge"></view>
				</view>
				管理员
			</button>
			<view class="bg-orange submit" @click.stop="showModal" data-target="DialogModalAdd">添加商品</view>
			<view class="bg-red submit">保存</view>
		</view>
	</view>
</template>

<script>
	import price_adjustment_details_test_data from '../../test/price_adjustment_details_test_data.js'; //测试数据
	export default {
		data() {
			return {
				items: [],
				currentItem: null,
			}
		},
		onLoad: function() {
			//定时器模拟ajax异步请求数据
			setTimeout(() => {
				this.items = price_adjustment_details_test_data;
			}, 300);
		},
		methods: {
			edit(id) {
				this.$util.toast(`演示编辑：` + id);
			},
			del(id) {
				this.$util.toast(`演示删除：` + id);
			}
		}
	}
</script>

<style scoped lang='scss'>
	.price_adjustment_datails {
		width: 100vw;
		height: 100vh;
		background-color: rgba(191, 200, 217, 0.3);
	}

	.item {
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		margin: 16rpx;

		.name {
			display: flex;
			justify-content: space-between;
			line-height: 28rpx;
		}

		.enclosure {
			display: flex;
			justify-content: space-between;
		}
	}

	.grid-item-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.grid-item-child-2 {
		display: flex;
		flex-direction: column;
		align-content: center;
		width: 50%;
	}

	.grid-item-child-3 {
		display: flex;
		justify-content: center;
		flex-direction: column;
		width: 33.33333%;
		align-content: center;
	}

	.bottom {
		position: fixed;
		bottom: 0;
		width: 100vw;
	}
</style>
