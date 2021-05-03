<template>
	<view class="price_adjustment_datails">
		<navBar title="调价明细" :backgroundColor="[1, ['#9000ff', '#5e00ff', 180]]" tabPage="/pages/index/index"
			:titleFont="['#FFF']"></navBar>
		<scroll-view scroll-y :scroll-with-animation="true" :enable-back-to-top="true"
			:style="{height:'calc(98vh - 98px - 8rpx)'}">
			<block v-for="(item,index) in items" :key="index">
				<view class="flex flex-direction radius margin-xs bg-white">
					<view class='flex justify-between padding-lr-sm padding-top-sm align-center'>
						<text class="text-bold text-cut">品名：{{items[index].name}}</text>
						<view>
							<text class="cuIcon-edit text-red margin-right-xs" @click='edit(items[index].id)'></text>
							<text class="cuIcon-delete text-blue" @click="del(items[index].id)"></text>
						</view>
					</view>
					<view class="flex justify-between margin-lr-sm padding-tb-xs dashed-bottom">
						<text v-if="items[index].barcode">商品条码：{{items[index].barcode}}</text>
						<text v-if="items[index].plu">plu号：{{items[index].plu}}</text>
						<text>规格：{{items[index].specs}}</text>
					</view>
					<view
						v-if="(items[index].salePrice&&items[index].memberPrice)||(items[index].salePrice&&items[index].vipPrice)||(items[index].memberPrice&&items[index].vipPrice)"
						class='grid col-3 margin-tb-xs margin-lr-sm'>
						<view class='cu-item padding-left flex flex-direction solid-bottom solid-right'>
							<text>原零售价</text>
							<text class="text-lg text-cyan text-price padding-tb-xs">{{items[index].salePrice.old||'--'}}</text>
						</view>
						<view class='cu-item padding-left flex flex-direction solid-bottom solid-right'>
							<text>原会员价</text>
							<text class="text-lg text-cyan text-price padding-tb-xs">{{items[index].memberPrice.old||'--'}}</text>
						</view>
						<view class='cu-item padding-left flex flex-direction solid-bottom'>
							<text>原VIP价</text>
							<text class="text-lg text-cyan text-price padding-tb-xs">{{items[index].vipPrice.old||'--'}}</text>
						</view>
						<view class='cu-item padding-left flex flex-direction solid-right'>
							<text class="padding-tb-xs">现零售价</text>
							<text class="text-lg text-red text-price">{{items[index].salePrice.new||'--'}}</text>
						</view>
						<view class='cu-item padding-left flex flex-direction solid-right'>
							<text class="padding-tb-xs">现会员价</text>
							<text class="text-lg text-red text-price">{{items[index].memberPrice.new||'--'}}</text>
						</view>
						<view class='cu-item padding-left flex flex-direction'>
							<text class="padding-tb-xs">现VIP价</text>
							<text class="text-lg text-red text-price">{{items[index].vipPrice.new||'--'}}</text>
						</view>
					</view>
					<view v-else class="grid col-2 margin-tb-xs">
						<view class='cu-item padding-left-xl flex flex-direction solid-right'>
							<text>原零售价</text>
							<text
								class="text-lg text-cyan text-price padding-top-xs">{{items[index].salePrice.old}}</text>
						</view>
						<view class='cu-item padding-left-xl flex flex-direction'>
							<text>现零售价</text>
							<text
								class="text-lg text-orange text-price padding-top-xs">{{items[index].salePrice.new}}</text>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
		<!--bootom-->
		<view class="bottom cu-bar bg-white tabbar border">
			<view class="action">
				<view class="cuIcon-tag">
					<view v-if="items.length > 0" class="cu-tag badge">{{items.length}}</view>
				</view>
				数量
			</view>
			<view class="bg-orange submit" @click.stop="showModal" data-target="DialogModalAdd">添加商品</view>
			<view class="bg-red submit">保存</view>
		</view>
	</view>
</template>

<script>
	import price_adjustment_details_test_data from '@/test/price_adjustment_details_test_data.js'; //测试数据
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

	.bottom {
		position: fixed;
		bottom: 0;
		width: 100vw;
	}
</style>
