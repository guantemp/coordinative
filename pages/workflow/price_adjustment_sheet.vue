<template>
	<view class="price_adjustment_sheet">
		<navBar title="调价单" :backgroundColor="[1, ['#9000ff', '#5e00ff', 180]]" :titleFont="['#FFF','left',700]"
			surplusHeight=43>
			<view slot="extendSlot" class="cu-bar search">
				<view class="search-form radius">
					<text class="cuIcon-search"></text>
					<input v-model="scanResult" :adjust-position="false" type="text" placeholder="请输入单据号、商品条码"
						confirm-type="search"></input>
					<text class="cuIcon-scan text-blue text-bold" @tap="scan"></text>
				</view>
				<view class="action" @click="computedScrollViewHeight">
					<text class="cuIcon-calendar text-white" style="height:100%,font-size:48rpx"></text>
				</view>
			</view>
		</navBar>
		<scroll-view scroll-y :scroll-with-animation="true" :enable-back-to-top="true"
			:style="{height:'calc(98vh - 148px - 16rpx)'}">
			<view scroll-x class="bg-white nav margin-top-xs">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index===tabCur?'text-orange cur':''"
						v-for="(item,index) in tabList" :key="index" @tap="tabSelect" :data-id="index">
						{{item}}
					</view>
				</view>
			</view>
			<block v-for="(item,index) in priceAdjustmentSheet" :key="index">
				<view class="sheet">
					<listCell :title="'单据号: ' + priceAdjustmentSheet[index].sheetNumber" :titleFont="['#8dc63f',28,700]"
						:line="['dashed','#e4e7ed']">
						<view slot="executableSlot">
							<text
								v-if="priceAdjustmentSheet[index].approval=='normal' || priceAdjustmentSheet[index].approval=='denied'"
								class="cuIcon-delete text-blue"
								@click.stop="deleteSheet(priceAdjustmentSheet[index].sheetNumber)"></text>
						</view>
					</listCell>
					<view class="sheetDetailed margin-top-sm padding-lr-xs"
						@tap.stop="this.$util.navTo('/pages/workflow/price_adjustment_details')">
						<text class="iconfont icon-price-adjustment left"
							:style="[{color:selectColor(priceAdjustmentSheet[index])}]"></text>
						<view class="show midlle">
							<text>申请日期：{{priceAdjustmentSheet[index].applyDate}}</text>
							<text class="margin-bottom-sm">生效日期：{{priceAdjustmentSheet[index].effectDate}}</text>
							<listCell :title="'申请人：' + priceAdjustmentSheet[index].proposer"
								:line="['dashed','#e4e7ed','top']">
							</listCell>
						</view>
						<text class="cuIcon-right text-gray margin-left-sm right"></text>
					</view>
				</view>
			</block>
		</scroll-view>
		<view class="add">
			<button class="cu-btn block lg radius shadow confirmBtn bg-gradual-orange"
				@tap.stop="this.$util.navTo('/pages/public/not_implemented')">
				<text class="cuIcon-add margin-right-xl"></text>新增调价单</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scanResult: '',
				tabCur: 0,
				tabList: [
					'今日',
					'昨日',
					'本周',
					'上周',
					'本月',
				],
				priceAdjustmentSheet: [{
						sheetNumber: 9975254532998877,
						applyDate: '2021-03-30 20:35:11',
						effectDate: '2021-03-30 17:37:12',
						proposer: "泸州共创商贸有限公司-图特哈蒙",
						approval: 'pass'
					}, {
						sheetNumber: 9975254522998878,
						applyDate: '2021-03-31 17:37:12',
						effectDate: '2021-04-07 21:37:12',
						proposer: "官莫莫",
						approval: 'denied'
					}, {
						sheetNumber: 9975254522998972,
						applyDate: '2021-03-31 15:22:33',
						effectDate: '2021-04-12 09:35:12',
						proposer: "泸州建国调味品经营部-黎宇宇",
						approval: 'normal'
					},
					{
						sheetNumber: 9975254522102156,
						applyDate: '2021-03-31 10:42:56',
						effectDate: '2021-04-02 23:59:59',
						proposer: "李憨憨",
						approval: 'pass'
					},
					{
						sheetNumber: 9975254545697823,
						applyDate: '2021-03-31 10:07:02',
						effectDate: '2021-04-03 00:00:00',
						proposer: "成都本和商贸有限公司-云中三月",
						approval: 'denied'
					},
					{
						sheetNumber: 9975254545697823,
						applyDate: '2021-03-31 09:08:02',
						effectDate: '2021-04-03 00:00:00',
						proposer: "成都本和商贸有限公司-言语东",
						approval: 'denied'
					},
					{
						sheetNumber: 9975254545697823,
						applyDate: '2021-03-31 09:07:02',
						effectDate: '2021-04-03 00:00:00',
						proposer: "成都本和商贸有限公司-松本特磕埕",
						approval: 'pass'
					}
				]
			}
		},
		methods: {
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
			tabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			selectColor(vaule) {
				if (vaule.approval === "pass")
					return "#1cbbb4";
				if (vaule.approval === "denied")
					return "#f37b1d";
				return "#8799a3";
			},
			computedScrollViewHeight() {
				let query = wx.createSelectorQuery();
				query.select('.bg-white.nav.margin-top-xs').boundingClientRect(rect => {
					let clientHeight = rect.height;
					console.log(clientHeight);
				}).exec();
			},
			deleteSheet(sheetNumber) {
				this.$util.toast(`演示删除：` + sheetNumber);
			},
		}
	}
</script>

<style scoped lang='scss'>
	.price_adjustment_sheet {
		width: 100vw;
		height: 100vh;
		background-color: #F8F8F8;
	}

	.sheet {
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		padding: 16rpx;
		background-color: #FFF;
		margin: 16rpx 16rpx 8rpx 16rpx;

		.sheetDetailed {
			display: flex;
			align-items: center;

			.left {
				font-size: 86rpx;
				flex: 0 0 16%;
			}

			.midlle {
				flex: 1;
			}

			.right {
				flex: 0 0 3%;
				font-size: 24rpx;
			}

			.show {
				display: flex;
				flex-direction: column;
			}
		}
	}

	.add {
		position: fixed;
		display: flex;
		justify-content: center;
		width: 100vw;
		bottom: 2vh;
		z-index: 1;

		>button {
			width: 88%;
		}
	}
</style>
