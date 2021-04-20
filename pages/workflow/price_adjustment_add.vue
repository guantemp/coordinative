<template>
	<view class="price_adjustment_add">
		<navBar title="调价明细" :backgroundColor="[1, ['#9000ff', '#5e00ff', 180]]" tabPage="/pages/index/index"
			:titleFont="['#FFF']" :surplusHeight="fold?'80':'15'">
			<view slot="extendSlot">
				<view v-show="fold">
					<view class="article text-white margin-tb-xs margin-lr">
						<view class="grid-item-container">
							<text class="shop1">适用门店：</text>
							<text class="shop2">泸州市龙马潭区嘉诚超市</text>
						</view>
						<view class="grid-item-container">
							<text class="shop1">生效日期：</text>
							<text class="shop2">{{effectiveDate}}</text>
							<text class="cuIcon-calendar" @click="selectDate"></text>
						</view>
						<view class="grid-item-container">
							<text class="shop1">备 注：</text>
							<input v-model="remarks" type="text" class="input shop2"
								placeholder-style="color:#dbdbdb;" />
						</view>
					</view>
				</view>
				<text class="fold text-white text-bold" :class="fold?'cuIcon-fold':'cuIcon-unfold'"
					@click="foldClick"></text>
			</view>
		</navBar>

		<view class="cu-bar bg-white tabbar border">
			<button class="action" open-type="contact">
				<view class="cuIcon-service text-green">
					<view class="cu-tag badge"></view>
				</view>
				管理员
			</button>
			<view class="bg-orange submit">添加商品</view>
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
				remarks: null,

				effectiveDate: null,
				initDate: null,
				dateVisible: false,
				confirmFlag: true,
				result: {}
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
</style>