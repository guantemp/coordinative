<template>
	<view class="price_adjustment_datails">
		<navBar title="调价明细" :backgroundColor="[1, ['#9000ff', '#5e00ff', 180]]" tabPage="/pages/index/index"
			:titleFont="['#FFF']"></navBar>
		<scroll-view scroll-y :scroll-with-animation="true" :enable-back-to-top="true"
			:style="{height:'calc(98vh - 98px - 16rpx)'}">
			<block v-for="(item,index) in items" :key="index">
				<view class="item bg-white">
					<view class='name text-shadow margin-bottom-xs'>
						<text class="text-bold text-green">品名：{{items[index].name}}</text>
						<view>
							<text class="cuIcon-edit text-red margin-right-sm"></text>
							<text class="cuIcon-delete text-blue"></text>
						</view>
					</view>
					<view class="enclosure padding-bottom-xs dashed-bottom">
						<text v-if="items[index].barcode">商品条码：{{items[index].barcode}}</text>
						<text v-if="items[index].plu">plu号：{{items[index].plu}}</text>
						<text>规格：{{items[index].specs}}</text>
					</view>
					<view
						v-if="(items[index].salePrice&&items[index].memberPrice)||(items[index].salePrice&&items[index].vipPrice)||(items[index].memberPrice&&items[index].vipPrice)"
						class='grid-item-container'>
						<view class='grid-item-child-3 padding-left-sm solid-right solid-bottom padding-tb-xs'>
							<text>原零售价</text>
							<text class="text-lg text-bold text-cyan text-price">{{items[index].salePrice.old}}</text>
						</view>
						<view class='grid-item-child-3 padding-left-sm solid-right solid-bottom padding-tb-xs'>
							<text>原会员价</text>
							<text
								class="text-lg text-bold text-blue text-price">{{items[index].memberPrice?items[index].memberPrice.old:'--'}}</text>
						</view>
						<view class='grid-item-child-3 padding-left-sm solid-bottom padding-tb-xs'>
							<text>原VIP价</text>
							<text
								class="text-lg text-bold text-blue text-price">{{items[index].vipPrice?items[index].vipPrice.old:'--'}}</text>
						</view>
						<view class='grid-item-child-3 padding-left-sm solid-right padding-top-xs'>
							<text>现零售价</text>
							<text class="text-lg text-bold text-yellow text-price">{{items[index].salePrice.new}}</text>
						</view>
						<view class='grid-item-child-3 padding-left-sm solid-right padding-top-xs'>
							<text>现会员价</text>
							<text
								class="text-lg text-bold text-orange text-price">{{items[index].memberPrice?items[index].memberPrice.new:'--'}}</text>
						</view>
						<view class='grid-item-child-3 padding-left-sm padding-top-xs'>
							<text>现VIP价</text>
							<text
								class="text-lg text-bold text-red text-price">{{items[index].vipPrice?items[index].vipPrice.new:'--'}}</text>
						</view>
					</view>
					<view v-else class='grid-item-container padding-top-xs'>
						<view class='grid-item-child-2 dashed-right padding-left-xl'>
							<text>原零售价</text>
							<text class="text-lg text-bold text-blue text-price">{{items[index].salePrice.old}}</text>
						</view>
						<view class='grid-item-child-2 padding-left-xl'>
							<text>现零售价</text>
							<text class="text-lg text-bold text-orange text-price">{{items[index].salePrice.new}}</text>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
		<view class="cu-bar bg-white tabbar border shop">
			<button class="action" open-type="contact">
				<view class="cuIcon-service text-green">
					<view class="cu-tag badge"></view>
				</view>
				备注
			</button>
			<view class="action">
				<view class="cuIcon-cart">
					<view class="cu-tag badge">99</view>
				</view>
				购物车
			</view>
			<view class="bg-orange submit">取消</view>
			<view class="bg-red submit">提交</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [{
					name: '立白超洁清新无磷型洗衣粉',
					barcode: 6907992100272,
					specs: '250ml',
					purchasePrice: '￥2.38/盒',
					salePrice: {
						old: '3.00/盒',
						new: '2.98/盒'
					},
				}, {
					name: '精品沃柑',
					plu: 13,
					specs: '500g',
					purchasePrice: '2.38/500g',
					salePrice: {
						old: '8.00/kg',
						new: '4.98/500g'
					},
					vipPrice: {
						old: '2.50/500g',
						new: '4.98/500g'
					}
				}, {
					name: '哇哈哈营养快线水果牛奶饮品（菠萝味）',
					barcode: 6902083898625,
					specs: '500ml',
					purchasePrice: '￥4.38/瓶',
					salePrice: {
						old: '11.98/瓶',
						new: '6.98/瓶'
					},
					memberPrice: {
						old: '10.98/瓶',
						new: '5.98/瓶'
					},
					vipPrice: {
						old: '4.98/瓶',
						new: '5.19/瓶'
					},
				}, {
					name: '川骄无芯卷纸（白四层）',
					barcode: 6970981171003,
					specs: '1800g',
					purchasePrice: '￥2.38/提',
					salePrice: {
						old: '11.98/提',
						new: '6.98/提'
					},
				}, {
					name: '云南三七牙膏（清新留兰）',
					barcode: 6953067200880,
					specs: '220g',
					purchasePrice: '￥32.38/支',
					salePrice: {
						old: '34.88/支',
						new: '28.58/支'
					},
					memberPrice: {
						old: '32.88/支',
						new: '27.58/支'
					},
				}]
			}
		}
	}
</script>

<style scoped lang='scss'>
	.price_adjustment_datails {
		width: 100vw;
		height: 100vh;
		background-color: #F0F0F0;
	}

	.item {
		display: flex;
		flex-direction: column;
		border-radius: 12rpx;
		padding: 20rpx 24rpx;
		margin: 8rpx 12rpx;

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

	.grid-item-child-4 {
		display: flex;
		justify-content: center;
		flex-direction: column;
		flex-wrap: wrap;
		width: 25%;
	}

	.grid-item-child-3 {
		display: flex;
		justify-content: center;
		flex-direction: column;
		width: 33.33333%;
		align-content: center;
	}
</style>
