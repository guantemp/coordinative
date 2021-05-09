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
		<view class="cu-modal" :class="isAddItemModal?'show':''">
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
					<view class="flex justify-between padding-lr-sm padding-bottom-xs">
						<text>产地：{{item.placeOfOrigin||'中国'}}</text>
						<text>等级：{{item.grade||'合格品'}}</text>
					</view>
					<view class="grid col-3 bg-cyan padding-tb-sm margin-lr-sm radius margin-bottom-xs">
						<view class='cu-item padding-left-sm flex flex-direction'>
							<text>零售价</text>
							<text class="text-lg text-price padding-top-xs">{{item.retailPrice||'--'}}</text>
						</view>
						<view class='cu-item padding-left-sm flex flex-direction'>
							<text>会员价</text>
							<text class="text-lg text-price padding-top-xs">{{item.memberPrice||'--'}}</text>
						</view>
						<view class='cu-item padding-left-sm flex flex-direction'>
							<text>PLUS会员价</text>
							<text class="text-lg text-price padding-top-xs">{{item.vipPrice||'--'}}</text>
						</view>
					</view>
					<view class="margin-lr-xs flex align-center">
						<switch class='orange radius' style="transform:scale(0.78)" @change="SwitchD"
							:class="switchD?'':'checked'" :checked="switchD?false:true"></switch>
						<text class="margin-left-xs">价格促销信息</text>
					</view>
					<view v-show="!switchD" class="text-left">
						<view class="flex padding-lr-sm padding-bottom-xs">
							<text style="flex-basis: 25%;">促销日期：</text>
							<text>{{item.promotion.startDate}} 至 {{item.promotion.endDate}}</text>
						</view>
						<view class="flex padding-lr-sm padding-bottom-xs">
							<text style="flex-basis: 25%;">促销价格：</text>
							<text>{{item.promotion.price}}</text>
						</view>
						<view class="flex padding-lr-sm padding-bottom-xs">
							<text style="flex-basis: 25%;">促销说明：</text>
							<text>{{item.promotion.explain}}</text>
						</view>
					</view>
					<view class="flex padding-lr-sm align-center">
						<text class="cuIcon-titles text-yellow"></text>
						<text>请选择适用标签</text>
					</view>
					<swiper class="labelSwiper margin-tb-xs square-dot" :current="swiperIndex"
						previous-margin="70rpx" next-margin="70rpx" indicator-dots="true" indicator-color="#8799a3"
						indicator-active-color="#0081ff" circular="true" @change="labelSwiper">
						<swiper-item v-for="(item,index) in labelList" :key="index"
							:class="swiperIndex==index?'cur':''">
							<view class="swiperItem">
								<image :src="item.url" mode="scaleToFill"></image>
							</view>
						</swiper-item>
					</swiper>
					<view class="flex align-start padding-lr-sm padding-bottom-xs">
						<text>打印数量：</text>
						<text class="text-price"></text>
						<input placeholder="1" type="number" v-model="printQuantity"
							class="solid-bottom basis-xs text-center"></input>
						<text class="cuIcon-roundadd"></text>
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
	import label from '@/test/label_test_data.js'; //用例数据库
	export default {
		data() {
			return {
				//add item data
				isAddItemModal: false,
				scanResult: null,
				items: {},
				item: {
					name: '彩虹柠檬香电热灭蚊香液',
					barcode: 6907861191394,
					placeOfOrigin: '四川.泸州',
					specs: '150ml',
					grade: '合格',
					retailPrice: '19.59/盒',
					memberPrice: '18.00/盒',
					vipPrice: '0.00/盒',
					promotion: {
						title: '',
						price: '1450.00/公斤',
						startDate: "2021-05-06 00:00:00",
						endDate: "2021-05-07 23:59:59",
						explain: '厂家回馈用户，只限于本店PLUS会员用户'
					},
				},
				switchD: true,
				labelList: [],
				swiperIndex: 2,
			}
		},
		onLoad(options) {
			setTimeout(() => {
				this.labelList = label.labelList;
			}, 300);
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
			SwitchD() {
				this.switchD = !this.switchD;
			},
			labelSwiper(e) {
				const that = this;
				that.cardCur = e.detail.current;
				that.swiperIndex = e.detail.current;
			},
			addItem() {

			},
		}
	}
</script>

<style lang='scss'>
	.labelSwiper {
		width: 100%;
		height: 220rpx;
	}

	.labelSwiper swiper-item {
		position: relative;
		box-sizing: border-box;
	}

	.labelSwiper swiper-item.cur .swiperItem {
		position: relative;
		transform: none;
		transition: all 0.2s ease-in 0s;
	}

	.labelSwiper swiper-item .swiperItem {
		display: flex;
		flex-direction: column;
		height: 100%;
		transform: scale(0.88);
		transition: all 0.2s ease-in 0s;
		overflow: hidden;
	}

	.labelSwiper swiper-item image {
		height: 220rpx;
		border-radius: 12rpx;
	}


	.bottom {
		position: fixed;
		bottom: 0;
		width: 100vw;
	}
</style>
