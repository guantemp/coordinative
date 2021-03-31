<template>
	<view class="content">
		<text class="solid-bottom text-lg padding text-red">HOPRXI协助工具 - Release Notes</text>
		<text class="solid-bottom text-lg text-blue padding">#version 0.0.7 2021-03-31</text>
		<text class="solid-bottom text-brown">* 【重要】实现门店定位或手动选择 </text>
		<text class="solid-bottom text-brown">* 【重要】调价单据的显示 </text>
		<text class="solid-bottom text-brown">*  优化list-cell组件，可以自定义字体颜色、大小、粗细，箭头图标可自选并点击事件 </text>
		<text class="solid-bottom text-lg text-blue padding">#version 0.0.6 2021-03-15</text>
		<text class="solid-bottom text-brown">* 【重要】实现自定义的导航栏组件 </text>
		<text class="solid-bottom text-lg text-blue padding">#version 0.0.5 2021-02-06</text>
		<text class="solid-bottom text-brown">* 【重要】业务流中商品档案、调价、标价、促销显示 </text>
		<text class="solid-bottom text-brown">* 【重要】业务流中采购菜单显示 </text>
		<text class="solid-bottom text-lg text-blue padding">#version 0.0.4 2021-01-04</text>
		<text class="solid-bottom text-brown">* 【重要】完成用户注册，登录，微信快捷登录功能 </text>
		<text class="solid-bottom text-brown">* 优化 控制台 消息通知 当控制台产生新日志时，右上角显示消息通知</text>
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
