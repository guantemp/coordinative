<template>
	<view>
		<navBar title="标签打印" :backgroundColor="[1, ['#3C8CE7', '#00EAFF', -45]]" tabPage="/pages/index/index"
			:titleFont="['#FFF']" id="navBar">
		</navBar>
		<!--items show-->
		<view v-if="items.length === 0" class="flex justify-center flex-direction align-center padding-bottom-lg"
			:style="{height:'calc(100vh - 190px)'}">
			<text class="icon-happy text-red margin-bottom-lg tips"></text>
			<text>没有任务、好开心...</text>
		</view>
		<scroll-view v-else scroll-y :scroll-with-animation="true" :enable-back-to-top="true"
			:style="{height: 'calc(100vh - 125px)'}">
		</scroll-view>
		<!--bootom-->
		<view class="bottom cu-bar bg-white tabbar border shop">
			<view class="action" @tap.stop="items=[]">
				<view class="cuIcon-delete">
					<view v-if="items.length > 0" class="cu-tag badge">{{items.length}}</view>
				</view>
				清空
			</view>
			<view class="action" @tap.stop="showImportDocumentModalDialog">
				<view class="cuIcon-form"></view>引入单据
			</view>
			<view class="bg-cyan submit" @tap.stop="showAddItemModalDialog" data-target="DialogModalAdd">增加商品</view>
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
								confirm-type="search" @confirm="searchConfirm"></input>
							<text class="cuIcon-scan text-blue text-bold" @tap="scan"></text>
						</view>
						<view class="action text-white">
							<text class="cuIcon-close "></text>
							<text @click="searchCancel">取消</text>
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
							:class="switchD?'':'checked'" :checked="switchD?false:true"
							:disabled="item.promotion?false:true"></switch>
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
						<button class="cu-btn cuIcon bg-cyan light" @tap.stop="subPrintQuantity">
							<text class="icon-minus margin-right-sm"></text></button>
						<input :placeholder="printQuantity" type="number" v-model="printQuantity"
							class="basis-xs text-center solid-bottom"></input>
						<button class="cu-btn cuIcon bg-cyan light" @tap.stop="addPrintQuantity">
							<text class="cuIcon-roundadd"></text></button>
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
				<view class="solid-bottom line-blue padding text-left text-lg align-center">
					<text class="icon-print margin-right-sm "></text>选择打印机
				</view>
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
				<view class="cu-bar bg-white solid-top">
					<view class="action margin-0 flex-sub text-green align-center" @tap="hidePrintRadioModalDialog">
						<text class="icon-print-setting margin-right-sm"></text>打印设置
					</view>
					<view class="action margin-0 flex-sub  solid-left" @tap="hidePrintRadioModalDialog">开始打印</view>
				</view>
			</view>
		</view>
		<!--单据引入对话框-->
		<view class="cu-modal" :class="importDocumentModalDialog?'show':''" @tap="hideImportDocumentModalDialog">
			<view class="cu-dialog" @tap.stop="">
				<view class="solid-bottom line-blue padding text-left text-lg align-center">
					<text class="cuIcon-form margin-right-sm "></text>引入单据
				</view>
				<radio-group class="block" @change="importDocumentRadioChange">
					<view class="cu-list menu text-left">
						<view class="cu-item">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">引入调价单</view>
								<radio class="round" :class="importDocumentRadio=='priceAdjustment'?'checked':''"
									checked="true" :checked="importDocumentRadio=='priceAdjustment'?true:false"
									value="priceAdjustment"></radio>
							</label>
						</view>
						<view class="cu-item">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">引入价格促销单</view>
								<radio class="round" :class="importDocumentRadio=='pricePromotion'?'checked':''"
									:checked="importDocumentRadio=='pricePromotion'?true:false" value="pricePromotion">
								</radio>
							</label>
						</view>
						<view class="cu-item">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">引入采购入库单</view>
								<radio class="round" :class="importDocumentRadio=='purchaseReceipt'?'checked':''"
									:checked="importDocumentRadio=='purchaseReceipt'?true:false"
									value="purchaseReceipt"></radio>
							</label>
						</view>
						<view class="cu-item">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">引入excel文件</view>
								<radio class="round" :class="importDocumentRadio=='excel'?'checked':''"
									:checked="importDocumentRadio=='excel'?true:false" value="excel"></radio>
							</label>
						</view>
					</view>
				</radio-group>
				<view class="cu-bar bg-white solid-top">
					<view class="action margin-0 flex-sub text-green solid-left" @tap="importDocumentModalDialog">下一步
					</view>
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
				scanResult: '',
				items: [],
				item: null,
				switchD: true,
				labelList: [],
				swiperIndex: 3,
				printQuantity: 1,
				labelTipsModalDialog: false,
				seclectedLabel: {},

				prints: [],
				printRadioModalDialog: false,
				printRadio: 'system',

				importDocumentModalDialog: false,
				importDocumentRadio: 'priceAdjustment',
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
				this.seclectLabel();
			}, 500);
			let sign = options.sign || '';
			switch (sign) {
				case 'price_adjustment':
					let sheetNumber = options.sheetNumber || '';
			}
			this.items = [{
				barcode: 6907861191394,
				grade: "合格品",
				id: "201451060435585024",
				memberPrice: "18.00/盒",
				name: "彩虹柠檬香电热灭蚊香液",
				placeOfOrigin: "四川.成都",
				retailPrice: "19.59/盒",
				specs: "150ml",
				vipPrice: "0.00/盒",
				label: {
					id: 45,
					name: "条码标签",
					printQuantity: 1,
					specs: "32mm(宽)*19mm(高)*3列",
					url: "/static/workflow/c.png"
				},
				promotion: {
					endDate: "2021-05-07 23:59:59",
					explain: "厂家回馈用户，只限于本店PLUS会员用户",
					price: "1450.00/公斤",
					startDate: "2021-05-06 00:00:00",
					title: "5.1节会员促销"
				}
			}, {
				memberPrice: "38.88/支",
				name: "菊品郁金银屑片",
				placeOfOrigin: "陕西.商洛市",
				retailPrice: "49.98/支",
				specs: "100片",
				vipPrice: "35.00/瓶",
				barcode: "6926094418474",
				grade: "合格品",
				id: "201452966564158972",
				label: {
					id: 334,
					name: "正价标签",
					printQuantity: 1,
					specs: "90mm(宽)*38mm(高)*1列",
					url: "/static/workflow/b.png",
				}
			}];
		},
		methods: {
			//add item opertion
			showAddItemModalDialog() {
				this.addItemModalDialog = true;
			},
			hideAddItemModalDialog() {
				this.addItemModalDialog = false;
			},
			searchConfirm() {
				var that = this;
				//that.clearItem();
				for (const i of catalog.catalog) {
					if (i.barcode == that.scanResult || i.plu == that.scanResult) {
						that.item = {
							name: i.name,
							specs: i.specs,
							placeOfOrigin: i.placeOfOrigin,
							grade: i.grade,
							retailPrice: i.retailPrice,
							memberPrice: i.memberPrice,
							vipPrice: i.vipPrice,
						};
						if (i.id) {
							that.item = {
								id: i.id,
								barcode: i.barcode,
								...that.item
							};
						}
						if (i.plu) {
							that.item = {
								plu: i.plu,
								...that.item
							};
						}
						if (i.promotion) {
							that.item = {
								promotion: i.promotion,
								...that.item
							};
						}
						break;
					}
				}
			},
			scan() {
				var that = this;
				uni.scanCode({
					scanType: ['barCode'],
					success: function(res) {
						that.scanResult = res.result;
						that.searchConfirm();
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
			subPrintQuantity() {
				if (this.printQuantity > 1 && this.item)
					this.printQuantity = this.printQuantity - 1;
			},
			addPrintQuantity() {
				if (this.item)
					this.printQuantity += 1;
			},
			addItem() {
				var that = this;
				if (!that.item) {
					that.$util.toast("没有商品被加入！");
					return;
				}
				for (const i of that.items) {
					if ((i.id && i.id === that.item.id) || (i.plu && i.plu === that.item.plu)) {
						that.$util.toast("编码" + (i.id || i.plu) + "的商品已存在，是否重复录入！");
						return;
					}
				}
				that.seclectedLabel = {
					printQuantity: that.printQuantity,
					...that.seclectedLabel
				}
				that.item = {
					label: that.seclectedLabel,
					...that.item
				}
				that.items.push(that.item);
				that.item = null;
				that.scanResult = '';
				that.printQuantity = 1;
				console.log(that.items);
			},

			showPrintRadioModalDialog() {
				if (this.items.length > 0)
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
			importDocumentRadioChange(event) {
				this.importDocumentRadio = event.detail.value;
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
