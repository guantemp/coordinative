<template>
	<view>
		<navBar title="会员管理" :backgroundColor="[1, ['#24bdab', '#80c54c', 45]]" tabPage="/pages/index/index"
			:titleFont="['#FFF','center']"></navBar>
		<view class='grid-item-container'>
			<block v-for="(item, index) in iconStyle" :key="index">
				<view class='grid-item-child'>
					<icon class='grid-item-icon' :type="item.type" :size='item.size' :color='item.color'></icon>
					<text class='grid-item-label'>{{item.type}}</text>
				</view>
			</block>
		</view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index===TabCur?'text-orange cur':''"
					v-for="(item,index) in tabList" :key="index" @tap="tabSelect" :data-id="index">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import navBar from '@/components/navBar/navBar.vue';
	export default {
		components: {
			navBar,
			//'HMfilterDropdown': HMfilterDropdown
		},
		data() {
			return {
				tabList: [{
					name: '区域'
				}, {
					name: '拼音'
				}, {
					name: '平分'
				}],
				TabCur: 0,
				iconColor: [
					'red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple'
				],
				iconStyle: [{
						"type": "success",
						"size": 30,
						"color": "#32CD32"
					},
					{
						"type": "success_no_circle",
						"size": 30,
						"color": "orange"
					},
					{
						"type": "info",
						"size": 30,
						"color": "yellow"
					},
					{
						"type": "warn",
						"size": 30,
						"color": "green"
					},
					{
						"type": "waiting",
						"size": 30,
						"color": "rgb(0,255,255)"
					},
					{
						"type": "cancel",
						"size": 30,
						"color": "blue"
					},
					{
						"type": "download",
						"size": 30,
						"color": "purple"
					},
					{
						"type": "search",
						"size": 30,
						"color": "#C4C4C4"
					},
					{
						"type": "clear",
						"size": 30,
						"color": "red"
					}
				]
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style scoped lang='scss'>
	/*
	  九宫格容器布局样式
	 */
	.grid-item-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		border-top: 1rpx solid #D9D9D9;
	}

	/*
	  item容器样式
	*/
	.grid-item-child {
		display: flex;
		justify-content: center;
		flex-direction: column;
		flex-wrap: wrap;
		float: left;
		width: 33.33333333%;
		height: 200rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-right: 1rpx solid #D9D9D9;
		border-bottom: 1rpx solid #D9D9D9;
	}

	/*
	  icon样式
	*/
	.grid-item-icon {
		display: flex;
		justify-content: center;
	}

	/*
	 文本样式
	*/
	.grid-item-label {
		display: flex;
		justify-content: center;
		color: #666;
		font-size: 14px;
	}
</style>
