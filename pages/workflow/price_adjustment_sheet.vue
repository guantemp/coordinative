<template>
	<view class="price_adjustment_sheet">
		<navBar title="调价单" :backgroundColor="[1, ['#9000ff', '#5e00ff', 180]]" :titleFont="['#FFF','left',700]"
			surplusHeight=43>
			<view slot="extendSlot" class="cu-bar search">
				<view class="search-form radius">
					<text class="cuIcon-search"></text>
					<input v-model="scanResult" :adjust-position="false" type="text" placeholder="请输入单据号、商品条码"
						confirm-type="search"></input>
					<text class="cuIcon-scan text-blue text-bold" @tap="scan"></text>
				</view>
				<view class="action text-white">
					<text class="cuIcon-close "></text>
					<text @click="computedScrollViewHeight">取消</text>
					<text class="cuIcon-filter margin-left-xs" @click="query"></text>
				</view>
			</view>
		</navBar>
		<view class="dataSelect solid padding-tb-sm padding-lr-lg" v-if="dataSelect">
			<text @click="selectDate(true)">{{formattedStartDate}}</text>
			<text>至</text>
			<text @click="selectDate(false)">{{formattedEndDate}}</text>
		</view>
		<scroll-view scroll-y :scroll-with-animation="true" :enable-back-to-top="true"
			:style="{height:'calc(98vh - 148px - 16rpx)'}">
			<view scroll-x class="bg-white nav margin-top-xs">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index===tabCur?'text-orange cur':''"
						v-for="(item,index) in tabList" :key="index" @tap="tabSelect" :data-id="index">
						{{item}}
					</view>
				</view>
			</view>
			<block v-for="(item,index) in priceAdjustmentSheet" :key="index">
				<view class="sheet">
					<listCell :title="'单据号: ' + priceAdjustmentSheet[index].sheetNumber" :titleFont="['#8dc63f',28,700]"
						:line="['dashed','#e4e7ed']" decorateIconClass="cuIcon-comment">
						<view slot="executableSlot">
							<text
								v-if="priceAdjustmentSheet[index].approval=='normal' || priceAdjustmentSheet[index].approval=='denied'"
								class="cuIcon-delete text-blue"
								@click.stop="showModal(priceAdjustmentSheet[index].sheetNumber,$event)"
								data-target="DialogModalDelete"></text>
						</view>
					</listCell>
					<view class="sheetDetailed margin-top-sm padding-lr-xs"
						@tap.stop="this.$util.navTo('/pages/workflow/price_adjustment_details')">
						<text class="iconfont icon-price-adjustment left"
							:style="[{color:selectColor(priceAdjustmentSheet[index])}]"></text>
						<view class="show midlle">
							<text>申请日期：{{priceAdjustmentSheet[index].applyDate}}</text>
							<text class="margin-bottom-sm">生效日期：{{priceAdjustmentSheet[index].effectDate}}</text>
							<listCell :title="'申请人：' + priceAdjustmentSheet[index].proposer"
								:line="['dashed','#e4e7ed','top']">
							</listCell>
						</view>
						<text class="cuIcon-right text-gray margin-left-sm right"></text>
					</view>
				</view>
			</block>
		</scroll-view>
		<view class="add">
			<button class="cu-btn block lg radius shadow confirmBtn bg-gradual-orange"
				@tap.stop="this.$util.navTo('/pages/public/not_implemented')">
				<text class="cuIcon-add margin-right-xl"></text>新增调价单</button>
		</view>
		<!-- 删除确认 -->
		<view class="cu-modal" :class="modalName=='DialogModalDelete'?'show':''">
			<view class="cu-dialog">
				<view class="padding-xl bg-white">
					<text class="text-bold">删除调价单据：</text>
					<text class="text-bold text-blue">{{currentSheetNumber}}</text>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-green " @tap="hideModal">取消</view>
					<view class="action margin-0 flex-sub  solid-left" @tap="deleteSheet(currentSheetNumber)">确定</view>
				</view>
			</view>
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
				<date-picker :startYear="2020" fields="day" :current="current" :disabled-after="true" :value="initDate"
					@change="handlerChange" @touchstart="touchStart" @touchend="touchEnd">
				</date-picker>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		formatDate,
	} from '../../js_sdk/util.js';
	import priceAdjustmentSheetTestData from '../../test/priceAdjustmentSheetTestData.js'; //测试数据
	export default {
		data() {
			return {
				scanResult: '',
				modalName: null,
				currentSheetNumber: null,
				dataSelect: true,
				tabCur: 0,
				tabList: [
					'今日',
					'昨日',
					'本周',
					'上周',
					'本月',
				],
				priceAdjustmentSheet: [],

				initDate: null,
				formattedStartDate: null,
				formattedEndDate: null,
				dateSign: true,
				dateVisible: false,
				confirmFlag: true,
				result: {},
			}
		},
		onLoad: function() {
			//定时器模拟ajax异步请求数据
			setTimeout(() => {
				this.priceAdjustmentSheet = priceAdjustmentSheetTestData;
			}, 300);
			this.formattedStartDate = formatDate(new Date(), "yyyy-MM-dd 00:00:00");
			this.formattedEndDate = formatDate(new Date(), "yyyy-MM-dd 23:59:59");
		},
		methods: {
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
			query() {
				this.dataSelect = !this.dataSelect;
			},

			tabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			selectColor(vaule) {
				if (vaule.approval === "pass")
					return "#1cbbb4";
				if (vaule.approval === "denied")
					return "#f37b1d";
				return "#8799a3";
			},
			showModal(sheetNumber, event) {
				this.currentSheetNumber = sheetNumber;
				this.modalName = event.currentTarget.dataset.target;
			},
			hideModal(v) {
				this.modalName = null;
			},
			deleteSheet(sheetNumber) {
				this.hideModal();
				this.priceAdjustmentSheet.forEach(function(item, index, arr) {
					//console.log(item.sheetNumber);
					if (item.sheetNumber == sheetNumber) {
						arr.splice(index, 1);
					}
				});
			},
			//以下日期选择函数
			selectDate(b) {
				this.dateVisible = true;
				if (b) {
					this.dateSign = true;
				} else {
					this.dateSign = false;
				}
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
				this.dateSign ? this.formattedStartDate = formatDate(new Date(this.result.value), "yyyy-MM-dd 00:00:00") :
					this
					.formattedEndDate = formatDate(new Date(this.result.value), "yyyy-MM-dd 23:59:59");
			},

			computedScrollViewHeight() {
				let query = wx.createSelectorQuery();
				query.select('.bg-white.nav.margin-top-xs').boundingClientRect(rect => {
					let clientHeight = rect.height;
					//console.log(clientHeight);
				}).exec();
				this.scanResult = null;
			},
		}
	}
</script>

<style scoped lang='scss'>
	.price_adjustment_sheet {
		width: 100vw;
		height: 100vh;
		background-color: #F8F8F8;
	}

	.dataSelect {
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #FFF;
	}

	.sheet {
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		padding: 16rpx;
		background-color: #FFF;
		margin: 16rpx 16rpx 8rpx 16rpx;

		.sheetDetailed {
			display: flex;
			align-items: center;

			.left {
				font-size: 86rpx;
				flex: 0 0 16%;
			}

			.midlle {
				flex: 1;
			}

			.right {
				flex: 0 0 3%;
				font-size: 24rpx;
			}

			.show {
				display: flex;
				flex-direction: column;
			}
		}
	}

	.add {
		position: fixed;
		display: flex;
		justify-content: center;
		width: 100vw;
		bottom: 2vh;
		z-index: 1;

		>button {
			width: 88%;
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
</style>
