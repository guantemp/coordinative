<template>
	<view>
		<navBar title="调价明细" :backgroundColor="[1, ['#9000ff', '#5e00ff', 180]]" :titleFont="['#FFF','center',700]">
		</navBar>
		<scroll-view scroll-y :scroll-with-animation="true" :enable-back-to-top="true"
			:style="{height:'calc(98vh - 98px - 16rpx)'}">
			<block v-for="(item,index) in items" :key="index">
				<view class="item">
					<view class='name text-brown text-lg'>
						<text>{{items[index].name}}</text>
						<text class="cuIcon-delete text-blue"></text>
					</view>
					<view class="enclosure solid-bottom padding-bottom-xs">
						<text v-if="items[index].barcode">条码：{{items[index].barcode}}</text>
						<text v-if="items[index].plu">PLU：{{items[index].plu}}</text>
						<text>规格：{{items[index].specs}}</text>
					</view>
					<view class="cu-list grid col-4 bg-green">
						<view class="cu-item " v-for="(item,index) in priceList" :key="index">
							<text class="text-sm">{{item}}</text>
							<text class="text-orange text-lg text-bold">78.00元/盒</text>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
		<view class="add">
			<button class="cu-btn block lg radius shadow confirmBtn bg-gradual-orange"
				@tap.stop="this.$util.navTo('/pages/public/not_implemented')">
				<text class="cuIcon-add margin-right-xl"></text>确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				priceList: [
					"原进货价",
					"原零售价",
					"原会员价",
					"原VIP价",
					"现进货价",
					"现零售价",
					"现会员价",
					"现VIP价",
				],
				items: [{
					name: '伊利纯牛奶',
					barcode: 6907992100272,
					specs: '250ml',
					purchasePrice: '￥2.38/盒',
					salePrice: '￥3.00/盒',
					memberPrice: '￥2.50/盒',
					vipPrice: ''
				}, {
					name: '精品沃柑',
					plu: 13,
					specs: '500g',
					purchasePrice: '￥2.38元/500g',
					salePrice: '￥8.00/kg',
					memberPrice: '',
					vipPrice: '￥2.50/500g'
				}, {
					name: '精品红富士',
					plu: 223,
					specs: '500g',
					purchasePrice: '￥4.38元/500g',
					salePrice: '￥11.98/kg',
					memberPrice: '',
					vipPrice: '￥4.98元/500g'
				}, {
					name: '百想膏',
					barcode: 6953067200880,
					specs: '12g',
					purchasePrice: '￥2.38元/支',
					salePrice: '￥8.00/支',
					memberPrice: '',
					vipPrice: '￥2.50/支'
				}]
			}
		}
	}
</script>

<style scoped lang='scss'>
	.item {
		display: flex;
		flex-direction: column;
		border-radius: 4rpx;
		padding: 16rpx;
		background-color: #FFF;
		margin: 16rpx 16rpx 8rpx 16rpx;

		.name {
			display: flex;
			justify-content: space-between;
		}

		.enclosure {
			display: flex;
			justify-content: space-between;
		}
	}

	.add {
		position: absolute;
		display: flex;
		justify-content: center;
		width: 100vw;
		bottom: 2vh;
		z-index: 1;

		>button {
			width: 88%;
		}
	}
</style>
