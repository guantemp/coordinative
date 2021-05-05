<template>
	<view class="badge">
		<slot></slot>
		<view class="badge-dot" v-if="dot"></view>
		<view class="badge-count bg-grey" v-else-if="count" @click="onClick()">{{count}}</view>
	</view>
</template>

<script>
	export default {
		props: {
			count: {
				type: String,
				default: ''
			},
			dot: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			finalCount() {
				return this.count > this.maxCount ? `${this.maxCount}+` : this.count
			}
		},
		methods: {
			onClick() {
				//this.badgeStyle = `width: ${String(this.text).length * 8 + 12}px`
				this.$emit('click');
			}
		}
	}
</script>

<style scoped>
	.badge {
		position: relative;
		display: inline-block;
		line-height: 1;
		vertical-align: middle;
	}

	.badge-count {
		position: absolute;
		transform: translateX(72%);
		top: -10upx;
		right: -25rpx;
		border-radius: 6rpx;
		min-width: 30rpx;


		line-height: 30rpx;
		text-align: center;
		padding: 0 8rpx;
		font-size: 18rpx;
		white-space: nowrap;
		z-index: 10;
		box-shadow: 0 0 0 1px #fff;
		box-sizing: border-box;
	}

	.badge-dot {
		position: absolute;
		transform: translateX(-50%);
		top: -8rpx;
		right: -16rpx;
		height: 16rpx;
		width: 16rpx;
		border-radius: 100%;
		background: #dd524d;
		z-index: 10;
		box-shadow: 0 0 0 1rpx #fff;
	}
</style>
