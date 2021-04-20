<template>
	<view class="price_adjustment_add">
		<navBar title="调价明细" :backgroundColor="[1, ['#9000ff', '#5e00ff', 180]]" tabPage="/pages/index/index"
			:titleFont="['#FFF']" :surplusHeight="fold?'80':'15'">
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
							<input v-model="scanResult" :adjust-position="false" type="text" placeholder="请输入商品条码、名称、拼音"
								confirm-type="search"></input>
							<text class="cuIcon-scan text-blue text-bold" @tap="scan"></text>
						</view>
						<view class="action text-white">
							<text class="cuIcon-close "></text>
							<text @click="modalCancel">取消</text>
							<text class="cuIcon-filter margin-left-xs" @click="query"></text>
						</view>
					</view>
					<view class="item">
						<text class="padding-lr-sm text-bold">品名：{{item.name||'--'}}</text>
						<view class="flex justify-between padding-lr-sm padding-tb-xs">
							<text v-if="item.barcode">商品条码：{{item.barcode||'--'}}</text>
							<text v-if="item.plu">plu号：{{item.plu}}</text>
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
								class="text-lg text-bold text-cyan text-price  padding-tb-xs">{{item.vip.referencePurchasePrice||'--'}}</text>
						</view>
						<view class='grid-item-child-3 padding-left-sm solid-bottom'>
							<text>最近入库价</text>
							<text
								class="text-lg text-bold text-cyan text-price  padding-tb-xs">{{item.storage.lastPurchasePrice||'--'}}</text>
						</view>
						<view class='grid-item-child-3 padding-left-sm solid-right'>
							<text class="padding-tb-xs">库存数量</text>
							<text class="text-lg text-bold text-red">{{item.storage.number||'--'}}</text>
						</view>
						<view class='grid-item-child-3 padding-left-sm solid-right '>
							<text class="padding-tb-xs">库存金额</text>
							<text class="text-lg text-bold text-red text-price">{{item.storage.amount||'--'}}</text>
						</view>
						<view class='grid-item-child-3 padding-left-sm'>
							<text class="padding-tb-xs cuIcon-creative">存货周转率</text>
							<text class="text-lg text-bold text-red ">{{item.storage.stockTurn||'--'}}</text>
						</view>
					</view>
					<view class="flex justify-around">
						<text>原零售价</text><text
							class="text-price">{{items[index].salePrice.old||'--'}}</text><text>现零售价</text>
						<text class="text-price"></text>
					</view>
					<view class="flex justify-around">
						<text>原会员价</text><text
							class="text-price">{{items[index].salePrice.old||'--'}}</text><text>现零售价</text>
						<text class="text-price"></text>
					</view>
					<view class="flex justify-around">
						<text>原VIP价</text><text
							class="text-price">{{items[index].salePrice.old||'--'}}</text><text>现零售价</text>
						<text class="text-price"></text>
					</view>
					<view class="flex justify-end margin-right-xs padding-tb-sm">
						<button class="cu-btn bg-mauve shadow basis-sm">增加</button>
						<button class="cu-btn bg-pink shadow margin-left-xs basis-sm">确定</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 单位选择抽屉 -->
		<view class="cu-modal drawer-modal justify-end" :class="modalName=='DrawerModalR'?'show':''" @tap="hideModal">
			<view class="cu-dialog basis-lg" @tap.stop=""
				:style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
				<view class="cu-list menu text-left">
					<view class="cu-item arrow" v-for="(item,index) in 5" :key="index">
						<view class="content">
							<view>Item {{index +1}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		formatDate,
	} from '../../js_sdk/util.js';
	import price_adjustment_add_test_data from '../../test/price_adjustment_details_test_data.js'; //测试数据
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
				result: {},

				modalName: null,
				scanResult: null,

				item: {
					name: '菊品郁金银屑片',
					barcode: '6926094418474',
					specs: '',
					vip: {
						referenceSalePrice: '45.25/瓶',
						referencePurchasePrice: '23.33/瓶'
					},
					storage: {
						lastPurchasePrice: '22.47/瓶',
						amount: 677.23,
						number: 12,
						stockTurn: 12.33
					}
				}
			}
		},
		onLoad: function() {
			//定时器模拟ajax异步请求数据
			setTimeout(() => {
				//this.items = price_adjustment_details_test_data;
			}, 300);
			this.effectiveDate = formatDate(new Date(), "yyyy-MM-dd 00:00:00");
		},
		methods: {
			foldClick() {
				this.fold = !this.fold;
				console.log(this.fold);
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
				this.result = {
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
				console.log(this.result);
				this.dateVisible = false;
				this.effectiveDate = formatDate(new Date(this.result.value), "yyyy-MM-dd hh:mm:ss")
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
			modalCancel() {
				this.scanResult = null;
			},
			showVip() {
				this.$util.toast("普通用户定位到省，购买Vip将可以定位到周边5KM");
			}
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

	.bottom {
		position: fixed;
		bottom: 0;
		width: 100vw;
	}
</style>
