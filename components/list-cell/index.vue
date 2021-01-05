<template>
	<view class="content">
		<view class="first_line">
			<view class="heading">
				<image v-if="icon" class="icon" :src="icon"></image>
				<text class="text-black">{{ title }}</text>
			</view>
			<image v-if="arrow" class="arrow" src="/static/user/arrow.png"></image>
		</view>
		<view class="second_line" :style="[lineStyle]" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				typeList: {
					left: 'iconzuo',
					right: 'iconyou',
					up: 'iconshang',
					down: 'iconxia'
				}
			};
		},
		props: {
			icon: {
				type: String,
				default: ''
			},
			//icon颜色
			iconColor: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: '标题'
			},
			arrow: {
				type: Boolean,
				default: true
			},
			hoverClass: {
				type: String,
				default: 'cell-hover'
			},
			// 线条的类型，solid-实线，dashed-方形虚线，dotted-圆点虚线
			lineBorderStyle: {
				type: String,
				default: 'solid'
			},
			lineMargin: {
				type: String,
				default: ''
			},
			lineHair: {
				type: Boolean,
				default: true
			},
			lineColor: {
				type: String,
				default: '#e4e7ed'
			}
		},
		methods: {
			eventClick() {
				this.$emit('eventClick');
			}
		},
		computed: {
			lineStyle() {
				let style = {};
				style.margin = this.margin;
				// 如果是水平线条，边框高度为1px，再通过transform缩小一半，就是0.5px了
				// 此处采用兼容分开写，兼容nvue的写法
				style.borderBottomWidth = '1px';
				style.borderBottomStyle = this.borderStyle;
				//style.width = this.$u.addUnit(this.length);
				if (this.hairLine) style.transform = 'scaleY(0.5)';
				style.borderColor = this.color;
				return style;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		min-height: 64rpx;
		background-color: #FFFFFF;
	}

	.first_line {
		display: flex;
		justify-content: space-between;
		padding-bottom: 20rpx;

		.heading {
			display: flex;
			align-items: center;
		}

		.icon {
			margin-right: 12rpx;
			width: 48rpx;
			height: 48rpx;
		}

		.arrow {
			margin-right: 16rpx;
			width: 36rpx;
			height: 36rpx;
		}
	}

	.second_line {
		vertical-align: middle;
		border-bottom: solid 1upx #f6f6f6;
	}
</style>
