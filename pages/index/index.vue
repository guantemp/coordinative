<template>
	<view>
		<view class="padding text-center bg-white">
			<text class="text-lg text-red">HOPRXI协助工具 - Release Notes</text>
		</view>
		<view class="cu-timeline">
			<view class="cu-item text-cyan">
				<view class="bg-cyan light content">
					<view class="cu-capsule radius">
						<view class="cu-tag bg-cyan">version 0.0.4</view>
						<view class="cu-tag line-cyan">2021-04-19</view>
					</view>
					<view class="margin-top flex flex-direction">
						<text>1、调价单据的优化及实现 </text>
						<text>2、优化navbar组件，增加额外部分高度可变 </text>
					</view>
				</view>
			</view>
			<view class="cu-item text-gray">
				<view class="bg-gray light content">
					<view class="cu-capsule radius">
						<view class="cu-tag bg-cyan">version 0.0.3</view>
						<view class="cu-tag line-cyan">2021-03-31</view>
					</view>
					<view class="margin-top flex flex-direction">
						<text>1、【重要】实现门店定位或手动选择 </text>
						<text>2、【重要】调价单据的显示 </text>
						<text>3、优化listCell组件，使其符合easycom规范，可自定义字体颜色、大小、粗细，箭头图标并点击事件 </text>
					</view>
				</view>
			</view>
			<view class="cu-item text-gray">
				<view class="bg-gray light content">
					<view class="cu-capsule radius">
						<view class="cu-tag bg-cyan">version 0.0.2</view>
						<view class="cu-tag line-cyan">2021-02-25</view>
					</view>
					<view class="margin-top flex flex-direction">
						<text>1、【重要】业务流中商品档案、调价、标价、促销显示 </text>
						<text>2、【重要】业务流中采购菜单显示 </text>
						<text>3、【重要】实现自定义的导航栏组件 </text>
					</view>
				</view>
			</view>
			<view class="cu-item text-gray">
				<view class="bg-gray light content">
					<view class="cu-capsule radius">
						<view class="cu-tag bg-cyan">version 0.0.1</view>
						<view class="cu-tag line-cyan">2021-01-04</view>
					</view>
					<view class="margin-top flex flex-direction">
						<text>1、【重要】完成用户注册，登录，微信快捷登录功能 </text>
						<text>2、优化 控制台 消息通知 当控制台产生新日志时，右上角显示消息通知</text>
					</view>
				</view>
			</view>
		</view>
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
