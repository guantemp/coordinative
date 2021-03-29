<template>
	<view class="content">
		<view class="first_line">
			<view class="left">
				<slot name="iconSlot">
					<image v-if="icon" class="icon" :src="icon"></image>
				</slot>
				<text :style="{color:titleColor}">{{ title }}</text>
			</view>
			<image v-if="arrow" class="arrow" src="/static/user/arrow.png" @click="arrowClick"></image>
		</view>
		<view class="second_line" :style="[lineStyle]" />
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		props: {
			icon: {
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
			// 线条的类型，solid-实线，dashed-方形虚线，dotted-圆点虚线
			borderStyle: {
				type: String,
				default: 'solid'
			},
			lineColor: {
				type: String,
				default: '#e4e7ed'
			},
			titleColor: {
				type: String,
				default: ''
			}
		},
		methods: {
			arrowClick() {
				this.$emit('arrowClick');
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
				style.borderColor = this.lineColor;
				return style;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		position: relative;
		min-height: 60rpx;
		background-color: #FFFFFF;
	}

	.first_line {
		display: flex;
		justify-content: space-between;
		padding-bottom: 16rpx;

		.left {
			display: flex;
			align-items: center;
			padding-left: 16rpx;
		}

		.icon {
			width: 48rpx;
			height: 48rpx;
			margin-right: 18rpx;
		}

		.arrow {
			margin-right: 16rpx;
			width: 36rpx;
			height: 36rpx;
		}
	}

	.second_line {
		vertical-align: middle;
		border-bottom: solid 1rpx #f6f6f6;
	}
</style>
