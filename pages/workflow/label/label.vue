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
					<swiper class="card-swiper margin-lr-sm" :class="dotStyle?'square-dot':'round-dot'"
						:indicator-dots="true" :circular="true" @change="cardSwiper" indicator-color="#8799a3"
						indicator-active-color="#0081ff">
						<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
							<view class="swiper-item">
								<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
								<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false"
									objectFit="cover" v-if="item.type=='video'"></video>
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
						explain:'厂家回馈用户，只限于本店PLUS会员用户'
					},
				},
				switchD: true,
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
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
			SwitchD() {
				this.switchD = !this.switchD;
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
