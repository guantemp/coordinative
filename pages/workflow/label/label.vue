<template>
	<view>
		<navBar title="标签打印" :backgroundColor="[1, ['#72EDF2', '#5151E5', 135]]" tabPage="/pages/index/index"
			:titleFont="['#FFF']" id="navBar">
		</navBar>

		<!--bootom-->
		<view class="bottom cu-bar bg-white tabbar border shop">
			<view class="action">
				<view class="cuIcon-delete">
					<view v-if="items.length > 0" class="cu-tag badge">{{items.length}}</view>
				</view>
				清空
			</view>
			<view class="action">
				<view class="cuIcon-form"></view>引入单据
			</view>
			<view class="bg-cyan submit" @click.stop="showAddItemModal" data-target="DialogModalAdd">增加商品</view>
			<view class="bg-blue submit" @click="computedHeight">打印</view>
		</view>

		<!-- 添加商品模态对话框 -->
		<view class="cu-modal " :class="isAddItemModal?'show':''">
			<view class="cu-dialog">
				<view @tap="hideAddItemModal" class="bg-white text-right padding-tb-sm padding-lr-lg">
					<text class="cuIcon-close text-red text-bold text-xl"></text>
				</view>
				<view class="bg-cyan light text-left">
					<view class="cu-bar search">
						<view class="search-form radius">
							<text class="cuIcon-search"></text>
							<input v-model="scanResult" :adjust-position="false" placeholder="请输入商品条码、名称、拼音"
								confirm-type="search"></input>
							<text class="cuIcon-scan text-blue text-bold" @tap="scan"></text>
						</view>
						<view class="action text-white">
							<text class="cuIcon-close "></text>
							<text @click="modalCancel">取消</text>
							<text class="cuIcon-filter margin-left-xs" @tap.stop="query"></text>
						</view>
					</view>
					<view class="padding-lr-sm">
						<text class="text-bold">品名：{{item.name||'--'}}</text>
					</view>
					<view class="flex justify-between padding-lr-sm padding-tb-xs">
						<text v-if="item.plu">plu号：{{item.plu}}</text>
						<text v-else>商品条码：{{item.barcode||'--'}}</text>
						<text>规格：{{item.specs||'--'}}</text>
					</view>

					<view class="flex justify-end margin-right-sm padding-tb-sm">
						<button class="cu-btn block radius shadow confirmBtn bg-gradual-blue basis-sm"
							@tap.stop="addItem">
							<text class="cuIcon-add margin-right-sm"></text>增加</button>
						<button class="cu-btn block radius shadow confirmBtn bg-gradual-blue margin-left-xs basis-sm"
							@tap.stop="this.$util.navTo('/pages/workflow/price_adjustment_add')">
							确定</button>
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
				//add item data
				isAddItemModal: false,
				scanResult: null,
				items: {},
				item: null,
			}
		},
		methods: {
			//add item opertion
			showAddItemModal() {
				this.isAddItemModal = true;
			},
			hideAddItemModal() {
				this.isAddItemModal = false;
			},
			scan() {
				var that = this;
				uni.scanCode({
					scanType: ['barCode'],
					success: function(res) {
						that.scanResult = res.result;
					},
					fail: function(res) {
						console.log(JSON.stringify(res));
					},
				});
			},
			addItem() {

			},
		}
	}
</script>

<style lang='scss'>
	.bottom {
		position: fixed;
		bottom: 0;
		width: 100vw;
	}

</style>
