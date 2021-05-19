<template>
	<view>
		<navBar title="商品目录" :backgroundColor="[1, ['#6B73FF', '#000DFF', 135]]" tabPage="/pages/index/index"
			:titleFont="['#FFF']" id="navBar">
		</navBar>
		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop"
				style="height:calc(100vh - 375upx)">
				<view class="cu-item" :class="index==tabCur?'text-green cur':''" v-for="(item,index) in list"
					:key="index" @tap="TabSelect" :data-id="index">
					Tab-{{item.name}}
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				tabCur: 0
			}
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			let list = [{}];
			for (let i = 0; i < 26; i++) {
				list[i] = {};
				list[i].name = String.fromCharCode(65 + i);
				list[i].id = i;
			}
			this.list = list;
			this.listCur = list[0];
		},
	}
</script>

<style>
	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
	}
	
	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
	}
	
	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
	}
	
</style>
