<template>
	<view>
		<redflower-showTips></redflower-showTips>
		<view class="padding text-center bg-white">
			<text class="text-lg text-red">HOPRXI协助工具 - Release Notes</text>
		</view>
		<view class="cu-timeline">
			<view class="cu-item text-gray">
				<view class="bg-gray light content">
					<view class="cu-capsule radius">
						<view class="cu-tag bg-green">version 0.0.7</view>
						<view class="cu-tag line-green">2021-06-17</view>
					</view>
					<view class="margin-top flex flex-direction">
						<text>呕吐：完成左滑删除，太难了</text>
					</view>
				</view>
			</view>
			<view class="cu-item text-gray">
				<view class="bg-gray light content">
					<view class="cu-capsule radius">
						<view class="cu-tag bg-green">version 0.0.6</view>
						<view class="cu-tag line-green">2021-06-04</view>
					</view>
					<view class="margin-top flex flex-direction">
						<text>1、商品编辑、增加</text>
						<text>2、标签打印的列表显示</text>
					</view>
				</view>
			</view>
			<view class="cu-item text-gray">
				<view class="bg-gray light content">
					<view class="cu-capsule radius">
						<view class="cu-tag bg-green">version 0.0.5</view>
						<view class="cu-tag line-green">2021-05-21</view>
					</view>
					<view class="margin-top flex flex-direction">
						<text>1、商品目录展示</text>
						<text>2、调价单据的bug修复及显示优化</text>
						<text>3、优化打印标签的设置</text>
					</view>
				</view>
			</view>
			<view class="cu-item text-gray">
				<view class="bg-gray light content">
					<view class="cu-capsule radius">
						<view class="cu-tag bg-green">version 0.0.4</view>
						<view class="cu-tag line-green">2021-05-10</view>
					</view>
					<view class="margin-top flex flex-direction">
						<text>1、调价单据的优化及本地js实现</text>
						<text>2、优化navbar组件,增加额外部分高度可变</text>
						<text>3、打印标签展示</text>
					</view>
				</view>
			</view>
			<view class="cu-item text-gray">
				<view class="bg-gray light content">
					<view class="cu-capsule radius">
						<view class="cu-tag bg-green">version 0.0.3</view>
						<view class="cu-tag line-green">2021-03-31</view>
					</view>
					<view class="margin-top flex flex-direction">
						<text>1、实现门店定位或手动选择 </text>
						<text>2、调价单据的显示 </text>
						<text>3、优化listCell组件，使其符合easycom规范，自定义字体颜色、大小、粗细，箭头图标并丢出点击事件 </text>
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
						<text>1、商品档案、调价、标价签、促销显示 </text>
						<text>2、采购菜单设计 </text>
						<text>3、实现自定义的导航栏组件 </text>
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
						<text>1、用户注册，登录，微信快捷登录功能 </text>
						<text>2、短信发送、验证码 </text>
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
