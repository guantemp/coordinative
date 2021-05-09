<template>
	<view class="price_adjustment_datails">
		<navBar title="调价明细" :backgroundColor="[1, ['#AC32E4', '#7918F2', -225]]" tabPage="/pages/index/index"
			:titleFont="['#FFF']" :surplusHeight="fold?'80':'15'">
			<view slot="extendSlot">
				<view v-show="fold">
					<view class="flex flex-direction text-white margin-tb-xs margin-lr">
						<view class="grid-item-container">
							<text class="shop1">适用门店：</text>
							<text class="shop2 text-cut">{{currentShop}}</text>
						</view>
						<view class="grid-item-container">
							<text class="shop1">生效日期：</text>
							<text class="shop2">{{effectiveDate}}</text>
						</view>
						<view class="grid-item-container">
							<text class="shop1">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</text>
							<text class="shop2">{{remark}}</text>
						</view>
					</view>
				</view>
				<text class="flex justify-center text-white text-bold" :class="fold?'cuIcon-fold':'cuIcon-unfold'"
					@click="foldClick"></text>
			</view>
		</navBar>
		<scroll-view scroll-y :scroll-with-animation="true" :enable-back-to-top="true"
			:style="{height: fold?'calc(100vh - 190px)':'calc(100vh - 125px)'}">
			<block v-for="(item,index) in price_adjustment[0].items" :key="index">
				<view class="flex flex-direction radius margin-xs bg-white">
					<view class='flex justify-between padding-lr-sm padding-top-sm align-center'>
						<text class="text-bold text-cut">品名：{{item.name}}</text>
						<text class="cuIcon-delete text-blue" @click="deleteItem(item.id||item.plu)"></text>
					</view>
					<view class="flex justify-between margin-lr-sm padding-tb-xs dashed-bottom"
						@click='editItem(item.id||item.plu)'>
						<text v-if="item.barcode">商品条码：{{item.barcode}}</text>
						<text v-if="item.plu">plu号：{{item.plu}}</text>
						<text>规格：{{item.specs}}</text>
					</view>
					<block
						v-if="(item.newRetailPrice&&item.newMemberPrice)||(item.newRetailPrice&&item.newVipPrice)||(item.newMemberPrice&&item.newVipPrice)">
						<view class='grid col-3' @click='editItem(item.id||item.plu)'>
							<view class='cu-item padding-left flex flex-direction'>
								<text>原零售价</text>
								<text
									class="text-lg text-cyan text-price  padding-tb-xs">{{item.retailPrice||'--'}}</text>
							</view>
							<view class='cu-item padding-left flex flex-direction'>
								<text>原会员价</text>
								<text
									class="text-lg text-cyan text-price padding-tb-xs">{{item.memberPrice||'--'}}</text>
							</view>
							<view class='cu-item padding-left flex flex-direction'>
								<text>原PLUS会员价</text>
								<text class="text-lg text-cyan text-price padding-tb-xs">{{item.vipPrice||'--'}}</text>
							</view>
							<view class='cu-item padding-left flex flex-direction'>
								<text>现零售价</text>
								<text
									class="text-lg text-red text-price padding-tb-xs">{{item.newRetailPrice||'--'}}</text>
							</view>
							<view class='cu-item padding-left  flex flex-direction'>
								<text>现会员价</text>
								<badge dot class="padding-tb-xs">
									<text
										class="text-lg text-red text-price padding-tb-xs">{{item.newMemberPrice||'--'}}</text>
								</badge>

							</view>
							<view class='cu-item padding-left flex flex-direction'>
								<text>现PLUS会员价</text>
								<badge count="9" class="padding-tb-xs">
									<text class="text-lg text-red text-price">{{item.newVipPrice||'--'}}</text>
								</badge>
							</view>
						</view>
					</block>
					<block v-else>
						<view v-if="item.newRetailPrice" class="grid col-2" @click='editItem(item.id||item.plu)'>
							<view class='cu-item padding-left-lg flex flex-direction'>
								<text>原零售价</text>
								<badge count="15.54%" class="padding-tb-xs">
									<text class="text-lg text-cyan text-price">{{item.retailPrice}}</text>
								</badge>
							</view>
							<view class='cu-item padding-left-lg flex flex-direction'>
								<text>现零售价</text>
								<badge count="12.54%" class="padding-tb-xs">
									<text class="text-lg text-orange text-price">{{item.newRetailPrice}}</text>
								</badge>
							</view>
						</view>
						<view v-else-if="item.newMemberPrice" class="grid col-2" @click='editItem(item.id||item.plu)'>
							<view class='cu-item padding-left-lg flex flex-direction'>
								<text>原会员价</text>
								<text class="text-lg text-cyan text-price padding-tb-xs">{{item.memberPrice}}</text>
							</view>
							<view class='cu-item padding-left-lg flex flex-direction'>
								<text>现会员价</text>
								<text
									class="text-lg text-orange text-price padding-tb-xs">{{item.newMemberPrice}}</text>
							</view>
						</view>
						<view v-else class="grid col-2" @click='editItem(item.id||item.plu)'>
							<view class='cu-item padding-left-lg flex flex-direction'>
								<text>原PLUS会员价</text>
								<text class="text-lg text-cyan text-price padding-tb-xs">{{item.vipPrice}}</text>
							</view>
							<view class='cu-item padding-left-lg flex flex-direction'>
								<text>现PLUS会员价</text>
								<text class="text-lg text-orange text-price padding-tb-xs">{{item.newVipPrice}}</text>
							</view>
						</view>
					</block>
				</view>
			</block>
		</scroll-view>
		<!--bootom-->
		<view class="bottom cu-bar bg-white tabbar border">
			<view class="action" @tap.stop="showClearModalDialog">
				<view class="cuIcon-delete">
					<view v-if="price_adjustment[0].items.length > 0" class="cu-tag badge">
						{{price_adjustment[0].items.length}}
					</view>
				</view>
				清空
			</view>
			<view class="bg-orange submit" @click.stop="showModal" data-target="DialogModalAdd">添加商品</view>
			<view class="bg-red submit">保存</view>
		</view>
	</view>
</template>

<script>
	import {
		formatDate,
	} from '@/js_sdk/util.js';
	import price_adjustment from '@/test/price_adjustment_details_test_data.js'; //测试数据
	export default {
		data() {
			return {
				fold: true,
				currentShop: '泸州市旺可隆超市国美绿洲店',
				effectiveDate: null,
				remark: '',

				price_adjustment: [],
			}
		},
		onLoad(options) {
			setTimeout(() => {
				this.price_adjustment = price_adjustment.price_adjustment;
			}, 300);
			this.effectiveDate = formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");
			let sheetNumber = options.sheetNumber || 'a';
			console.log(sheetNumber);
		},
		methods: {
			foldClick() {
				this.fold = !this.fold;
			},
			editItem(key) {
				this.$util.toast(`演示编辑：` + key);
			},
			deleteItem(key) {
				var that = this;
				let index = 0;
				for (const item of that.price_adjustment[0].items) {
					if (item.id === key || item.plu === key) {
						that.price_adjustment[0].items.splice(index, 1);
						break;
					}
					index += 1;
				}
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

	.grid-item-container {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;

		.shop1 {
			width: 22%;
		}

		.shop2 {
			flex: 1;
		}
	}

	.bottom {
		position: fixed;
		bottom: 0;
		width: 100vw;
	}
</style>
