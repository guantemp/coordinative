<template>
	<view class="price_adjustment_add">
		<navBar title="调价明细" :backgroundColor="[1, ['#9000ff', '#5e00ff', 180]]" tabPage="/pages/index/index"
			:titleFont="['#FFF']" :surplusHeight="fold?'80':'15'" id="navBar">
			<view slot="extendSlot">
				<view v-show="fold">
					<view class="article text-white margin-tb-xs margin-lr">
						<view class="grid-item-container">
							<text class="shop1">适用门店：</text>
							<text class="shop2">{{currentShop}}</text>
						</view>
						<view class="grid-item-container">
							<text class="shop1">生效日期：</text>
							<text class="shop2">{{effectiveDate}}</text>
							<text class="cuIcon-calendar" @click="selectDate"></text>
						</view>
						<view class="grid-item-container">
							<text class="shop1">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</text>
							<input v-model="remarks" type="text" class="input shop2"
								placeholder-style="color:#dbdbdb;" />
						</view>
					</view>
				</view>
				<text class="fold text-white text-bold" :class="fold?'cuIcon-fold':'cuIcon-unfold'"
					@click="foldClick"></text>
			</view>
		</navBar>

		<!--items show-->
		<view v-if="items||items.length === 0" class="empty padding-bottom-lg"
			:style="{height: fold?'calc(100vh - 190px)':'calc(100vh - 125px)'}">
			<text class="cuIcon-like text-red margin-bottom tips"></text>
			<text>空空如也...</text>
		</view>
		<scroll-view scroll-y :scroll-with-animation="true" :enable-back-to-top="true"
			:style="{height: fold?'calc(100vh - 190px)':'calc(100vh - 125px)'}" v-else>

		</scroll-view>

		<!--bootom-->
		<view class="bottom cu-bar bg-white tabbar border shop">
			<button class="action" open-type="contact">
				<view class="cuIcon-service text-green">
					<view class="cu-tag badge"></view>
				</view>
				管理员
			</button>
			<view class="action">
				<view class="cuIcon-tag">
					<view v-if="items.length > 0" class="cu-tag badge">{{items.length}}</view>
				</view>
				数量
			</view>
			<view class="bg-orange submit" @click.stop="showModal" data-target="DialogModalAdd">添加商品</view>
			<view class="bg-red submit" @click="computedHeight">保存</view>
		</view>

		<!-- 日期选择 -->
		<view class="dateSelect">
			<view class="mask" :class="{'visible':dateVisible}" @tap="onCancel" @touchmove.stop.prevent
				catchtouchmove="true"></view>
			<view class="dateSelect-cnt" :class="{'visible':dateVisible}">
				<view class="dateSelect-header" @touchmove.stop.prevent catchtouchmove="true">
					<text @tap.stop.prevent="onCancel">取消</text>
					<text class="text-orange" @tap.stop.prevent="pickerConfirm">确定</text>
				</view>
				<date-picker :startYear="2020" fields="second" :current="current" :value="initDate"
					@change="handlerChange" @touchstart="touchStart" @touchend="touchEnd">
				</date-picker>
			</view>
		</view>

		<!-- 添加商品明细模态对话框 -->
		<view class="cu-modal bottom-modal" :class="modalName=='DialogModalAdd'?'show':''">
			<view class="cu-dialog">
				<view @tap="hideModal" class="bg-white text-right padding-tb-sm padding-lr-lg">
					<text class="cuIcon-close text-red text-bold text-xl"></text>
				</view>
				<view class="modalContent bg-purple light text-left">
					<view class="cu-bar search">
						<view class="search-form radius">
							<text class="cuIcon-search"></text>
							<input v-model="scanResult" :adjust-position="false" placeholder="请输入商品条码、名称、拼音"
								confirm-type="search"></input>
							<text class="cuIcon-scan text-blue text-bold" @tap="scan"></text>
						</view>
						<view class="action text-white">
							<text class="cuIcon-close "></text>
							<text @click="modalCancel">取消</text>
							<text class="cuIcon-filter margin-left-xs" @tap.stop="query"></text>
						</view>
					</view>
					<view class="item">
						<view class="flex justify-between padding-lr-sm">
							<text class="text-bold">品名：{{item.name||'--'}}</text>
							<text class="iconfont icon-unit text-blue text-lg" @tap.stop="showUnitDrawerModal"></text>
						</view>
						<view class="flex justify-between padding-lr-sm padding-tb-xs">
							<text v-if="item.plu">plu号：{{item.plu}}</text>
							<text v-else>商品条码：{{item.barcode||'--'}}</text>
							<text>规格：{{item.specs||'--'}}</text>
						</view>
					</view>
					<view class='grid-item-vip dashed-bottom bg-purple padding-tb-sm'>
						<view class='grid-item-child-3 padding-left-sm solid-right solid-bottom'>
							<text class="cuIcon-vip" @click="showVip">区域参考售价</text>
							<text
								class="text-lg text-bold text-cyan text-price padding-tb-xs">{{item.vip.referenceSalePrice||'--'}}</text>
						</view>
						<view class='grid-item-child-3 padding-left-sm solid-right solid-bottom'>
							<text class="cuIcon-vip" @click="showVip">区域参考进价</text>
							<text
								class="text-lg text-bold text-cyan text-price padding-tb-xs">{{item.vip.referencePurchasePrice||'--'}}</text>
						</view>
						<view class='grid-item-child-3 padding-left-sm solid-bottom'>
							<text>最近入库价</text>
							<text
								class="text-lg text-bold text-price padding-tb-xs text-yellow">{{item.storage.lastPurchasePrice||'--'}}</text>
						</view>
						<view class='grid-item-child-3 padding-left-sm solid-right'>
							<text class="padding-tb-xs">库存数量</text>
							<text class="text-lg text-bold text-pink">{{item.storage.number||'--'}}</text>
						</view>
						<view class='grid-item-child-3 padding-left-sm solid-right '>
							<text class="padding-tb-xs">库存金额</text>
							<text class="text-lg text-bold text-pink text-price">{{item.storage.amount||'--'}}</text>
						</view>
						<view class='grid-item-child-3 padding-left-sm'>
							<text class="padding-tb-xs cuIcon-question">存货周转率</text>
							<text class="text-lg text-bold text-green">{{item.storage.stockTurn||'--'}}</text>
						</view>
					</view>
					<view class="flex justify-between align-center margin-lr-sm">
						<view class="basis-df">
							<text>原零售价：</text>
							<text class="text-price margin-left-xs text-blue">{{item.salePrice.old||'--'}}</text>
						</view>
						<view class="flex justify-between align-center">
							<text class="basis-df">现零售价：</text>
							<view class="price">
								<text class="text-price margin-right-xs"></text>
								<input :placeholder="item.salePrice.new" name="salePrice" type="digit"
									@blur="supplementaryUnit('sale')"></input>
							</view>
						</view>
					</view>
					<view class="flex justify-between align-center margin-lr-sm margin-tb-xs">
						<view class="basis-df">
							<text>原会员价：</text>
							<text class="text-price margin-left-xs text-blue">{{item.memberPrice.old||'--'}}</text>
						</view>
						<view class="flex justify-between align-center">
							<text class="basis-df">现会员价：</text>
							<view class="price">
								<text class="text-price margin-right-xs"></text>
								<input :placeholder="item.memberPrice.new||'--'" name="memberPrice" type="digit"
									@blur="supplementaryUnit('member')"></input>
							</view>
						</view>
					</view>
					<view class="flex justify-between align-center margin-lr-sm">
						<view class="basis-df">
							<text>原Vip价：</text>
							<text class="text-price margin-left-xs text-blue">{{item.vipPrice.old||'--'}}</text>
						</view>
						<view class="flex justify-between align-center">
							<text class="basis-df">现VIP价：</text>
							<view class="price">
								<text class="text-price margin-right-xs"></text>
								<input :placeholder="item.vipPrice.new" name="vipPrice" type="digit"
									@blur="supplementaryUnit('vip')"></input>
							</view>
						</view>
					</view>
					<view class="flex justify-end margin-right-sm padding-tb-sm">
						<button class="cu-btn block radius shadow confirmBtn bg-gradual-purple basis-sm"
							@tap.stop="addItem">
							<text class="cuIcon-add margin-right-sm"></text>增加</button>
						<button class="cu-btn block radius shadow confirmBtn bg-gradual-purple basis-sm margin-left-xs"
							@tap.stop="this.$util.navTo('/pages/workflow/price_adjustment_add')">
							确定</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 单位选择抽屉 -->
		<view class="cu-modal drawer-modal justify-end" :class="unitDrawerModal?'show':''" @tap="hideUnitDrawerModal">
			<view class="cu-dialog basis-lg bg-white" @tap.stop=""
				:style="[{top:140+'px',height:'calc(100vh - ' + 140 + 'px)'}]">
				<view class="padding-sm solid-bottom text-left">
					<text class="cuIcon-titles ">选择价格单位</text>
				</view>
				<view class="units text-df">
					<block v-for="(unit, index) in units" :key="index">
						<text class="unit padding-tb-xs padding-lr text-center margin-top-sm bg-grey"
							@tap.stop="selectUnit(unit)">{{unit}}</text>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		formatDate,
	} from '@/js_sdk/util.js';
	import price_adjustment_test_data from '@/test/price_adjustment_test_data.js'; //测试数据
	export default {
		data() {
			return {
				fold: true,
				currentShop: '泸州市龙马潭区嘉诚超市',
				remarks: null,

				effectiveDate: null,
				initDate: null,
				dateVisible: false,
				confirmFlag: true,
				resultDate: {},

				modalName: null,
				unitDrawerModal: false,
				scanResult: null,

				items: {},
				item: {
					name: '菊品郁金银屑片',
					barcode: '6926094418474',
					specs: '100片',
					vip: {
						referenceSalePrice: '45.25/瓶',
						referencePurchasePrice: '23.33/瓶'
					},
					storage: {
						lastPurchasePrice: '22.47/瓶',
						amount: 677.23,
						number: 12,
						stockTurn: 12.33
					},
					salePrice: {
						old: '40.00/瓶',
						new: '38.00/瓶',
					},
					vipPrice: {
						old: '35.00/瓶',
						new: '32.00/瓶',
					},
					memberPrice: {
						old: null,
						new: null,
					}
				},
				unit: null,
				units:[]
			}
		},
		onLoad: function() {
			//定时器模拟ajax异步请求数据
			setTimeout(() => {
				this.effectiveDate = formatDate(new Date(), "yyyy-MM-dd 00:00:00");
				this.units = price_adjustment_test_data.units;
			}, 300);

		},
		methods: {
			foldClick() {
				this.fold = !this.fold;
			},

			selectDate() {
				this.dateVisible = true;
			},
			touchStart() {
				if (this.timeout) {
					this.confirmFlag = false;
				}
			},
			touchEnd() {
				if (this.timeout) {
					setTimeout(() => {
						this.confirmFlag = true;
					}, 500)
				}
			},
			handlerChange(res) {
				let _this = this;
				this.resultDate = {
					...res
				};
			},
			onCancel(res) {
				this.dateVisible = false;
			},
			pickerConfirm() {
				if (!this.confirmFlag) {
					return;
				};
				//console.log(this.resultDate);
				this.dateVisible = false;
				this.effectiveDate = formatDate(new Date(this.resultDate.value), "yyyy-MM-dd hh:mm:ss")
			},

			hideUnitDrawerModal() {
				this.unitDrawerModal = false;
			},
			showUnitDrawerModal() {
				this.unitDrawerModal = true;
			},
			selectUnit(v) {
				this.unit = v;
				this.unitDrawerModal = false;
			},
			
			showModal(event) {
				this.modalName = event.currentTarget.dataset.target;
			},
			hideModal(v) {
				this.modalName = null;
			},
			scan() {
				var that = this;
				uni.scanCode({
					scanType: ['barCode'],
					success: function(res) {
						that.scanResult = res.result;
					},
					fail: function(res) {
						console.log(JSON.stringify(res));
					},
				});
			},
			queryCancel() {
				this.scanResult = null;
			},
			showVip() {
				this.$util.toast("普通用户定位到省，付费用户可定位到周边3KM");
			},
			supplementaryUnit(unit) {

			},
			addItem() {
				this.item = {};
			},

			computedHeight() {
				let occupiedHeight;
				const query = uni.createSelectorQuery();
				query.select('#navBar').boundingClientRect(rect => {
					occupiedHeight = rect.height;
					this.$util.toast("height:" + occupiedHeight);
				}).exec();
				query.select('.bottom').boundingClientRect(rect => {
					occupiedHeight = occupiedHeight + rect.height;
					
				}).exec();
			
			},
		}
	}
</script>

<style scoped lang='scss'>
	.price_adjustment_add {
		width: 100vw;
		height: 100vh;
		background-color: rgba(191, 200, 217, 0.3);
	}

	.article {
		display: flex;
		flex-direction: column;
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

		.shop3 {
			width: 25%;
		}
	}

	.input {
		flex: 1;
		border-radius: 10rpx;
		background-color: rgba(32, 32, 32, .35);
		padding: 0 20rpx;
		color: #dbdbdb;
		text-overflow: ellipsis;
	}

	.fold {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.empty {
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;

		.tips {
			font-size: 164rpx;
		}
	}

	.dateSelect {
		z-index: 888;

		.mask {
			position: fixed;
			z-index: 1000;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.6);
			visibility: hidden;
			opacity: 0;
			transition: all 0.3s ease;
		}

		.mask.visible {
			visibility: visible;
			opacity: 1;
		}

		.dateSelect-cnt {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			transition: all 0.3s ease;
			transform: translateY(100%);
			z-index: 3000;
			background-color: #fff;
		}

		.dateSelect-cnt.visible {
			transform: translateY(0);
		}

		.dateSelect-header {
			display: flex;
			align-items: center;
			padding: 0 30upx;
			height: 88upx;
			background-color: #fff;
			position: relative;
			text-align: center;
			font-size: 32upx;
			justify-content: space-between;
			border-bottom: solid 1px #eee;

			.dateSelect-btn {
				font-size: 30upx;
			}
		}

		.dateSelect-hd:after {
			content: ' ';
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;
			height: 1px;
			border-bottom: 1px solid #e5e5e5;
			color: #e5e5e5;
			transform-origin: 0 100%;
			transform: scaleY(0.5);
		}
	}

	.item {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.grid-item-vip {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin: 0rpx 16rpx 12rpx 16rpx;
		border-radius: 16rpx;
	}

	.grid-item-child-3 {
		display: flex;
		flex-direction: column;
		width: 33.33333%;
	}

	.price {
		display: flex;
		border-bottom: 1px solid #fFF;
		align-items: center;
	}

	.bottom {
		position: fixed;
		bottom: 0;
		width: 100vw;
	}

	.units {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 0rpx 12rpx;

		.unit {
			border-radius: 3px;
			border: 1rpx solid #9b9b9b;
			margin-right: 10rpx;
		}
	}
</style>
