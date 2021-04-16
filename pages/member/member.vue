<template>
	<view class="price_adjustment_datails">
		<navBar title="测试页" :backgroundColor="[1, ['#0081ff', '#1cbbb4', -90]]" tabPage="/pages/index/index"
			:titleFont="['#FFF','center']"></navBar>
		<view>
			<text @click="dateShow" class="text-bold text-center">日期选择</text>
		</view>
		<view>
			<text v-if="date">{{date}}</text>
		</view>
		<view class="dateSelect">
			<view class="mask" :class="{'visible':visible}" @tap="onCancel" @touchmove.stop.prevent
				catchtouchmove="true"></view>
			<view class="dateSelect-cnt" :class="{'visible':visible}">
				<view class="dateSelect-header" @touchmove.stop.prevent catchtouchmove="true">
					<text @tap.stop.prevent="onCancel">取消</text>
					<text class="text-orange" @tap.stop.prevent="pickerConfirm">确定</text>
				</view>
				<date-picker :startYear="2020" fields="day" :current="current" :disabled-after="true" value="2020-04-08"
					@change="handlerChange" @touchstart="touchStart" @touchend="touchEnd">
				</date-picker>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				visible: true,
				itemHeight: `height: ${uni.upx2px(88)}px;`,
				result: {},
				date: null,
				confirmFlag: true,
			}
		},
		methods: {
			dateShow() {
				this.visible = true;
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
				this.visible = false;
			},
			pickerConfirm() {
				if (!this.confirmFlag) {
					return;
				};
				this.date = this.result.result;
				this.visible = false;
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
