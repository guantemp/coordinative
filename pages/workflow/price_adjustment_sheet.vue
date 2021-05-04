<template>
	<view class="price_adjustment_sheet">
		<navBar title="调价单" :backgroundColor="[1, ['#AC32E4', '#7918F2', 90]]" :titleFont="['#FFF','left',700]"
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
		<view class="flex justify-around align-center bg-white solid padding-tb-sm padding-lr-lg" v-if="dateShow">
			<text @click.stop="selectDate(true)">{{formattedStartDate}}</text>
			<text>至</text>
			<text @click.stop="selectDate(false)">{{formattedEndDate}}</text>
		</view>
		<scroll-view scroll-y :scroll-with-animation="true" :enable-back-to-top="true"
			:style="{height:dateShow?'calc(98vh - 186px - 10rpx)':'calc(98vh - 148px - 10rpx)'}">
			<view scroll-x class="bg-white nav margin-top-xs">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index===tabCur?'text-orange cur':''"
						v-for="(item,index) in tabList" :key="index" @tap="tabSelect" :data-id="index">
						{{item}}
					</view>
				</view>
			</view>
			<block v-for="(sheet,index) in priceAdjustmentSheet" :key="index">
				<view class="sheet">
					<listCell :title="'单据号: ' + sheet.sheetNumber" :titleFont="['#8799a3',28,700]"
						:line="['dashed','#e4e7ed']" decorateIconClass="cuIcon-comment">
						<view slot="executableSlot">
							<text v-if="sheet.approval==='normal' || sheet.approval==='denied'"
								class="cuIcon-delete text-blue" @click.stop="showModal(sheet.sheetNumber,$event)"
								data-target="DialogModalDelete"></text>
						</view>
					</listCell>
					<view class="sheetDetailed margin-top-xs padding-lr-xs"
						@tap.stop="this.$util.navTo('/pages/workflow/price_adjustment_details?sheetNumber='+sheet.sheetNumber)">
						<text class="iconfont icon-price-adjustment left" :style="[{color:selectColor(sheet)}]"></text>
						<view class="flex flex-direction midlle text-cut">
							<text>申请日期：{{sheet.applyDate}}</text>
							<text class="text-cut">适配门店：{{sheet.store}}</text>
							<text class="margin-bottom-xs">生效日期：{{sheet.effectDate}}</text>
							<listCell :title="'申请人：' + sheet.proposer" :line="['dashed','#e4e7ed','top']">
							</listCell>
						</view>
						<text class="cuIcon-right text-grey margin-left-sm right"></text>
					</view>
				</view>
			</block>
		</scroll-view>
		<view class="add">
			<button class="cu-btn lg radius shadow bg-gradual-orange basis-xl"
				@tap.stop="this.$util.navTo('/pages/workflow/price_adjustment_add?sign=add')">
				<text class="cuIcon-add margin-right-xl"></text>新增调价单</button>
		</view>
		<!-- 删除对话框 -->
		<view class="cu-modal" :class="modalName=='DialogModalDelete'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="content">删除提示</view>
				</view>
				<view class="padding-xl bg-white text-bold">
					<text>删除调价单据：</text>
					<text class="text-blue">{{currentSheetNumber}}</text>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-green" @tap="hideModal">取消</view>
					<view class="action margin-0 flex-sub solid-left" @tap="deleteSheet(currentSheetNumber)">确定</view>
				</view>
			</view>
		</view>
		<!-- 日期选择 -->
		<view class="cu-modal bottom-modal" :class="dateSelectModalDialog?'show':''" @tap="hideDateModal">
			<view class="cu-dialog" @tap.stop="">
				<view
					class="flex align-center justify-between padding-lr-lg padding-tb-sm bg-white solid-bottom text-lg">
					<text @tap.stop.prevent="hideDateModal">取消</text>
					<text class="text-orange" @tap.stop.prevent="pickerConfirm">确定</text>
				</view>
				<date-picker :startYear="startYear" fields="day" :current="current" :value="initDate"
					@change="handlerChange" @touchstart="touchStart" @touchend="touchEnd">
				</date-picker>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		formatDate,
	} from '@/js_sdk/util.js';
	import priceAdjustmentSheetTestData from '@/test/price_adjustment_sheet_test_data.js'; //测试数据
	export default {
		data() {
			return {
				scanResult: '',
				modalName: null,
				currentSheetNumber: null,

				dateShow: false,
				tabCur: 0,
				tabList: [
					'今日',
					'昨日',
					'本周',
					'上周',
				],
				priceAdjustmentSheet: [],

				dateSelectModalDialog: false,
				startYear: null,
				initDate: null,
				formattedStartDate: null,
				formattedEndDate: null,
				dateSign: true,
				confirmFlag: true,
				result: {},
			}
		},
		onLoad: function() {
			//定时器模拟ajax异步请求数据
			setTimeout(() => {
				this.priceAdjustmentSheet = priceAdjustmentSheetTestData;
			}, 300);
			var currentDate = new Date();
			this.formattedStartDate = formatDate(currentDate, "yyyy-MM-dd 00:00:00");
			this.formattedEndDate = formatDate(currentDate, "yyyy-MM-dd 23:59:59");
			currentDate.setDate(currentDate.getDate() - 31);
			this.startYear = currentDate.getFullYear();
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
				this.dateShow = !this.dateShow;
			},

			tabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				let er = e.currentTarget.dataset.id;
				let _this = this;
				this.tabList.forEach(function(item, index, arr) {
					if (index === _this.tabCur) {
						console.log(item);
					}
				});
			},
			selectColor(vaule) {
				if (vaule.approval === "pass")
					return "#39b54a";
				if (vaule.approval === "denied")
					return "#f37b1d";
				return "#8799a3";
			},
			showModal(sheetNumber, event) {
				this.modalName = event.currentTarget.dataset.target;
				this.currentSheetNumber = sheetNumber;
			},
			hideModal() {
				this.modalName = null;
			},
			deleteSheet(sheetNumber) {
				this.hideModal();
				this.priceAdjustmentSheet.forEach(function(item, index, arr) {
					//console.log(item.sheetNumber);
					if (item.sheetNumber === sheetNumber) {
						arr.splice(index, 1);
					}
				});
			},
			//以下日期选择函数
			selectDate(b) {
				this.dateSign = b;
				this.initDate = this.dateSign ? formatDate(new Date(this.formattedStartDate), "yyyy-MM-dd") : formatDate(
					new Date(this.formattedEndDate), "yyyy-MM-dd");
				this.dateSelectModalDialog = true;
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
			hideDateModal() {
				this.dateSelectModalDialog = false;
			},
			pickerConfirm() {
				if (!this.confirmFlag) {
					return;
				};
				this.dateSelectModalDialog = false;
				this.dateSign ? this.formattedStartDate = formatDate(new Date(this.result.value), "yyyy-MM-dd 00:00:00") :
					this.formattedEndDate = formatDate(new Date(this.result.value), "yyyy-MM-dd 23:59:59");
				this.initDate = this.dateSign ? formatDate(new Date(this.result.value), "yyyy-MM-dd") : formatDate(
					new Date(this.result.value), "yyyy-MM-dd");
			},

			computedScrollViewHeight() {
				let query = wx.createSelectorQuery();
				query.select('.flex.justify-around.align-center.bg-white').boundingClientRect(rect => {
					let clientHeight = rect.height;
					console.log(clientHeight);
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

	.sheet {
		display: flex;
		flex-direction: column;
		border-radius: 16rpx;
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
		}
	}

	.add {
		display: flex;
		justify-content: center;
		width: 100vw;
		position: fixed;
		bottom: 1.5vh;
	}
</style>
