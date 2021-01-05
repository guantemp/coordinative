<template>
	<view class="content">
		<text class="solid-bottom text-lg padding text-red">HOPRXI协助工具 - Release Notes</text>
		<text class="solid-bottom text-blue padding">#version 0.0.4 2021-01-04</text>
		<text class="solid-bottom text-sm  text-brown">* 【重要】完成用户注册，登录，微信快捷登录功能 </text>
		<text class="solid-bottom text-sm text-brown">* 优化 控制台 消息通知 当控制台产生新日志时，右上角显示消息通知</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
