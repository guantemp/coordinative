<template>
	<view class="cell">
		<view v-if="isTop" class="line" :style="[lineStyle]" />
		<view class="show" :style="{padding:isTop?'10rpx 0rpx 0rpx 0rpx':'0 16rpx 16rpx 16rpx'}">
			<view class="left">
				<slot name="decorateIconSlot">
					<image v-if="decorateIcon && !isTop" class="decorateIcon" :src="decorateIcon"></image>
					<!-- 线在顶上不显示-->
				</slot>
				<text
					:style="{color:textDecorate.color,'fontSize':textDecorate.size + 'rpx','fontWeight':textDecorate.weight}">{{ title }}</text>
			</view>
			<image v-if="arrow" class="executable" :src="executableIcon" @click="executable"></image>
		</view>
		<view v-if="!isTop" class="line" :style="[lineStyle]" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lineValue: {},
				isTop: false,
				textDecorate: {
					color: '#000',
					size: 28,
					weight: 400
				},
				lineDecorate: {
					style: 'solid',
					color: '#e4e7ed',
					postion: 'bottom'
				}
			};
		},
		props: {
			decorateIcon: {
				type: String,
				default: ''
			},
			executableIcon: {
				type: String,
				default: '/static/user/arrow.png'
			},
			title: {
				type: String,
				default: '标题'
			},
			titleFont: {
				type: Array,
				//字体选项：颜色，大小,粗细
				//比如：['#000', 28, 400]
				default: []
			},
			arrow: {
				type: Boolean,
				default: true
			},
			line: {
				type: Array,
				//['solid', '#e4e7ed', "bottom"]
				// 线条的类型，solid-实线，dashed-方形虚线，dotted-圆点虚线
				// 颜色
				// 位置：bottom-底，top-顶
				default: []
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
		},
		methods: {
			executable(event) {
				this.$emit('executable');
			},
		},
		created() {
			if (Array.isArray(this.line)) {
				if (this.line.length === 1) {
					this.lineDecorate.style = this.line[0];
				} else if (this.line.length === 2) {
					this.lineDecorate.style = this.line[0];
					this.lineDecorate.color = this.line[1];
				} else if (this.line.length === 3) {
					this.lineDecorate.style = this.line[0];
					this.lineDecorate.color = this.line[1];
					if (this.line[2] === 'top')
						this.isTop = true;
				}
			}
			if (Array.isArray(this.titleFont)) {
				if (this.titleFont.length === 1) {
					this.textDecorate.color = this.titleFont[0]
				} else if (this.titleFont.length === 2) {
					this.textDecorate.color = this.titleFont[0]
					this.textDecorate.size = this.titleFont[1]
				} else if (this.titleFont.length === 3) {
					this.textDecorate.color = this.titleFont[0]
					this.textDecorate.size = this.titleFont[1]
					this.textDecorate.weight = this.titleFont[2]
				}
			}
			//console.log(this.isTop)
		},
		computed: {
			lineStyle() {
				let style = {};
				style.margin = this.margin;
				// 如果是水平线条，边框高度为1px，再通过transform缩小一半，就是0.5px了
				// 此处采用兼容分开写，兼容nvue的写法
				style.borderBottomWidth = '1px';
				style.borderBottomStyle = this.lineDecorate.style;
				//style.width = this.$u.addUnit(this.length);
				if (this.hairLine) style.transform = 'scaleY(0.5)';
				style.borderColor = this.lineDecorate.color;
				return style;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.cell {
		display: flex;
		flex-direction: column;
		background-color: #FFF;
	}

	.show {
		display: flex;
		justify-content: space-between;

		.left {
			display: flex;
			align-items: center;
		}

		.decorateIcon {
			width: 48rpx;
			height: 48rpx;
			margin-right: 18rpx;
		}

		.executable {
			width: 36rpx;
			height: 36rpx;
		}
	}

	.line {
		vertical-align: middle;
		border-bottom: solid 1rpx #f6f6f6;
	}
</style>
