<template>
	<view>
		<navBar title="标签打印" :backgroundColor="[1, ['#72EDF2', '#5151E5', 135]]" tabPage="/pages/index/index"
			:titleFont="['#FFF']" id="navBar">
		</navBar>
		<!--items show-->
		<view v-if="items.length === 0" class="flex justify-center flex-direction align-center padding-bottom-lg"
			:style="{height:'calc(100vh - 190px)'}">
			<text class="icon-happy text-red margin-bottom-lg tips"></text>
			<text>没有任务、好开心...</text>
		</view>
		<!--bootom-->
		<view class="bottom cu-bar bg-white tabbar border shop">
			<view class="action">
				<view class="cuIcon-delete">
					<view v-if="items.length > 0" class="cu-tag badge">{{items.length}}</view>
				</view>
				清空
			</view>
			<view class="action" @tap.stop="showImportDocumentModalDialog">
				<view class="cuIcon-form"></view>引入单据
			</view>
			<view class="bg-cyan submit" @click.stop="showAddItemModalDialog" data-target="DialogModalAdd">增加商品</view>
			<view class="bg-blue submit" @click="showPrintRadioModalDialog">打印</view>
		</view>
		<!-- 添加商品模态对话框 -->
		<view class="cu-modal" :class="addItemModalDialog?'show':''">
			<view class="cu-dialog">
				<view @tap="hideAddItemModalDialog" class="bg-white text-right padding-tb-sm padding-lr-lg">
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
					<swiper class="labelSwiper margin-tb-xs square-dot" :current="swiperIndex" previous-margin="70rpx"
						next-margin="70rpx" indicator-dots="true" indicator-color="#8799a3"
						indicator-active-color="#0081ff" circular="true" @change="labelSwiperChange">
						<swiper-item v-for="(item,index) in labelList" :key="index"
							:class="swiperIndex === index?'cur':''" @tap.stop="showLabelTipsModalDialog">
							<view class="swiperItem">
								<image :src="item.url" mode="scaleToFill"></image>
							</view>
						</swiper-item>
					</swiper>
					<view class="flex align-center padding-lr-sm padding-bottom-xs">
						<text>打印数量：</text>
						<text class="icon-minus"></text>
						<input placeholder="1" type="number" v-model="printQuantity"
							class="basis-xs text-center"></input>
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
		<!-- 标签提示展示框 -->
		<view class="cu-modal" :class="labelTipsModalDialog?'show':''" @tap="hideLabelTipsModalDialog">
			<view class="cu-dialog" @tap.stop="" style="width:550rpx">
				<view class="flex flex-direction padding text-left">
					<text>标签名称：{{seclectedLabel.name}}</text>
					<text>标签规格：{{seclectedLabel.specs}}</text>
				</view>
			</view>
		</view>
		<!--打印选项对话框-->
		<view class="cu-modal" :class="printRadioModalDialog?'show':''" @tap="hidePrintRadioModalDialog">
			<view class="cu-dialog" @tap.stop="">
				<radio-group class="block" @change="printRadioChange">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(print,index) in prints" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{print.name}}</view>
								<radio class="round" :class="printRadio === print.id?'checked':''"
									:checked="printRadio === print.id?true:false" :value="print.id"></radio>
							</label>
						</view>
					</view>
				</radio-group>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-green" @tap="hidePrintRadioModalDialog">跳转打印设置
					</view>
					<view class="action margin-0 flex-sub  solid-left" @tap="hidePrintRadioModalDialog">开始打印</view>
				</view>
			</view>
		</view>
		<!--单据引入对话框-->
		<view class="cu-modal" :class="importDocumentModalDialog?'show':''" @tap="hideImportDocumentModalDialog">
			<view class="cu-dialog" @tap.stop="">
				<radio-group class="block" @change="importDocumentRadioChange">
					<view class="cu-list menu text-left">
						<view class="cu-item">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">引入-调价单</view>
								<radio class="round" :class="radio=='radio' + index?'checked':''" checked="true"
									value="priceAdjustment"></radio>
							</label>
						</view>
						<view class="cu-item">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">引入-价格促销单</view>
								<radio class="round" :class="radio=='radio' + index?'checked':''"
									:checked="radio=='radio' + index?true:false" value="pricePromotion"></radio>
							</label>
						</view>
						<view class="cu-item">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">引入-采购入库单</view>
								<radio class="round" :class="radio=='radio' + index?'checked':''"
									:checked="radio=='radio' + index?true:false" :value="purchaseReceipt"></radio>
							</label>
						</view>
						<view class="cu-item">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">引入-excel文件</view>
								<radio class="round" :class="radio=='radio' + index?'checked':''"
									:checked="radio=='radio' + index?true:false" value="excel"></radio>
							</label>
						</view>
					</view>
				</radio-group>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="importDocumentModalDialog">下一步</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import label from '@/test/label_test_data.js'; //用例数据库
	import catalog from '@/test/catalog_test_data.js'; //用例数据库
	export default {
		data() {
			return {
				addItemModalDialog: false,
				scanResult: null,
				items: [],
				item: {},
				switchD: true,
				labelList: [],
				swiperIndex: 3,
				printQuantity: '',
				labelTipsModalDialog: false,
				seclectedLabel: {},

				prints: [],
				printRadioModalDialog: false,
				printRadio: 'system',

				importDocumentModalDialog: false,
			}
		},
		watch: {
			swiperIndex() {
				this.seclectLabel();
			}
		},
		onLoad(options) {
			setTimeout(() => {
				this.labelList = label.labelList;
				this.prints = label.prints;
				this.item = catalog.catalog[0];
				this.seclectLabel();
			}, 500);

		},
		methods: {
			//add item opertion
			showAddItemModalDialog() {
				this.addItemModalDialog = true;
			},
			hideAddItemModalDialog() {
				this.addItemModalDialog = false;
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
			labelSwiperChange(event) {
				this.swiperIndex = event.detail.current;
			},
			seclectLabel() {
				let that = this;
				let index = 0;
				for (const label of that.labelList) {
					if (that.swiperIndex === index) {
						that.seclectedLabel = label;
						break;
					}
					index += 1;
				}
			},
			showLabelTipsModalDialog() {
				this.labelTipsModalDialog = true;
			},
			hideLabelTipsModalDialog() {
				this.labelTipsModalDialog = false;
			},
			addItem() {

			},

			showPrintRadioModalDialog() {
				this.printRadioModalDialog = true;
			},
			hidePrintRadioModalDialog() {
				this.printRadioModalDialog = false;
			},
			printRadioChange(event) {
				this.printRadio = event.detail.value;
				//console.log(this.printRadio);
			},

			showImportDocumentModalDialog() {
				this.importDocumentModalDialog = true;
			},
			hideImportDocumentModalDialog() {
				this.importDocumentModalDialog = false;
			},

			computedHeight() {
				let query = uni.createSelectorQuery().in(this);
				query.select('#navBar').boundingClientRect().exec(rect => {
					console.log(rect);
					this.occupiedHeight = rect[0].height;
				});
				query = uni.createSelectorQuery().in(this);
				query.select('.bottom').boundingClientRect().exec(rect => {
					this.occupiedHeight = this.occupiedHeight + rect[0].height;
					this.$util.toast("height:" + this.occupiedHeight);
				});
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

	.tips {
		font-size: 164rpx;
		transform: rotate(7deg);
	}

	.bottom {
		position: fixed;
		bottom: 0;
		width: 100vw;
	}
</style>
