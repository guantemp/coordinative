<template>
	<view class="price_adjustment_add">
		<navBar title="新增调价单" :backgroundColor="[1, ['#AC32E4', '#7918F2', -225]]" tabPage="/pages/index/index"
			:titleFont="['#FFF']" :surplusHeight="fold?'80':'15'" id="navBar">
			<view slot="extendSlot">
				<view v-show="fold">
					<view class="flex flex-direction text-white margin-tb-xs margin-lr">
						<view class="grid-item-container">
							<text class="shop1">适用门店：</text>
							<text class="shop2">{{currentShop}}</text>
						</view>
						<view class="grid-item-container">
							<text class="shop1">生效日期：</text>
							<text class="shop2">{{effectiveDateTime}}</text>
							<text class="cuIcon-calendar" @click="showDateModal"></text>
						</view>
						<view class="grid-item-container">
							<text class="shop1">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</text>
							<input v-model="remarks" type="text" class="remarks shop2"
								placeholder-style="color:#dbdbdb;" placeholder="备注信息" />
						</view>
					</view>
				</view>
				<text class="flex justify-center text-white text-bold" :class="fold?'cuIcon-fold':'cuIcon-unfold'"
					@click="foldClick"></text>
			</view>
		</navBar>
		<!--items show-->
		<view v-if="items.length === 0" class="flex justify-center flex-direction align-center padding-bottom-lg"
			:style="{height: fold?'calc(100vh - 190px)':'calc(100vh - 125px)'}">
			<text class="cuIcon-like text-red margin-bottom tips"></text>
			<text>空空如也...</text>
		</view>
		<scroll-view v-else scroll-y :scroll-with-animation="true" :enable-back-to-top="true"
			:style="{height: fold?'calc(100vh - 190px)':'calc(100vh - 125px)'}">
			<template v-for="(item,index) in items">
				<view class="flex flex-direction radius margin-xs bg-white light ">
					<view class='flex justify-between padding-lr-sm padding-top-sm align-center'>
						<text class="text-bold">品名：{{item.name}}</text>
						<text class="cuIcon-delete text-blue" @click="deleteItem(item.id||item.plu)"></text>
					</view>
					<view class="flex justify-between padding-lr-sm margin-tb-xs dashed-bottom"
						@click='editItem(item.id||item.plu)'>
						<text v-if="item.barcode">商品条码：{{item.barcode}}</text>
						<text v-if="item.plu">plu号：{{item.plu}}</text>
						<text>规格：{{item.specs}}</text>
					</view>
					<view
						v-if="(item.newRetailPrice&&item.newMemberPrice)||(item.newRetailPrice&&item.newVipPrice)||(item.newMemberPrice&&items[index].newVipPrice)"
						class='grid col-3' @click='editItem(item.id||item.plu)'>
						<view class='cu-item padding-left flex flex-direction'>
							<text>原零售价</text>
							<text class="text-lg text-cyan text-price  padding-tb-xs"
								:style="item.retailPrice&&item.newRetailPrice?'text-decoration:line-through':''">{{item.retailPrice}}</text>
						</view>
						<view class='cu-item padding-left flex flex-direction'>
							<text>原会员价</text>
							<text class="text-lg text-cyan text-price padding-tb-xs"
								:style="item.memberPrice&&item.newMemberPrice?'text-decoration:line-through':''">{{item.memberPrice}}</text>
						</view>
						<view class='cu-item padding-left flex flex-direction'>
							<text>原PLUS会员价</text>
							<text class="text-lg text-cyan text-price padding-tb-xs"
								:style="item.vipPrice&&item.newVipPrice?'text-decoration:line-through':''">{{item.vipPrice}}</text>
						</view>
						<view class='cu-item padding-left flex flex-direction'>
							<text>现零售价</text>
							<text class="text-lg text-red text-price padding-tb-xs">{{item.newRetailPrice||'--'}}</text>
						</view>
						<view class='cu-item padding-left  flex flex-direction'>
							<text>现会员价</text>
							<text class="text-lg text-red text-price padding-tb-xs">{{item.newMemberPrice||'--'}}</text>
						</view>
						<view class='cu-item padding-left flex flex-direction'>
							<text>现PLUS会员价</text>
							<text class="text-lg text-red text-price padding-tb-xs">{{item.newVipPrice||'--'}}</text>
						</view>
					</view>
					<template v-else>
						<view v-if="item.newRetailPrice" class="grid col-2" @click='editItem(item.id||item.plu)'>
							<view class='cu-item padding-left-lg flex flex-direction'>
								<text>原零售价</text>
								<text class="text-lg text-cyan text-price padding-tb-xs"
									:style="item.retailPrice&&item.newRetailPrice?'text-decoration:line-through':''">{{item.retailPrice}}</text>
							</view>
							<view class='cu-item padding-left-lg flex flex-direction'>
								<text>现零售价</text>
								<text
									class="text-lg text-orange text-price padding-tb-xs">{{item.newRetailPrice}}</text>
							</view>
						</view>
						<view v-else-if="item.newMemberPrice" class="grid col-2" @click='editItem(item.id||item.plu)'>
							<view class='cu-item padding-left-lg flex flex-direction'>
								<text>原会员价</text>
								<text class="text-lg text-cyan text-price padding-tb-xs"
									:style="item.memberPrice&&item.newMemberPrice?'text-decoration:line-through':''">{{item.memberPrice}}</text>
							</view>
							<view class='cu-item padding-left-lg flex flex-direction'>
								<text>现会员价</text>
								<text
									class="text-lg text-orange text-price padding-tb-xs">{{item.newMemberPrice}}</text>
							</view>
						</view>
						<view v-else class="grid col-2" @click='editItem(item.id||item.plu)'>
							<view class='cu-item padding-left-lg flex flex-direction'>
								<text>原PLUS会员价</text>
								<text class="text-lg text-cyan text-price padding-tb-xs"
									:style="item.vipPrice&&item.newVipPrice?'text-decoration:line-through':''">{{item.vipPrice}}</text>
							</view>
							<view class='cu-item padding-left-lg flex flex-direction'>
								<text>现PLUS会员价</text>
								<text class="text-lg text-orange text-price padding-tb-xs">{{item.newVipPrice}}</text>
							</view>
						</view>
					</template>
				</view>
			</template>
		</scroll-view>
		<!--bootom-->
		<view class="bottom cu-bar bg-white tabbar border">
			<view class="action" @tap.stop="this.$util.navTo('/pages/workflow/label/label')">
				<view class="icon-label-print margin-bottom-xs" style="font-size: 38rpx"></view>打印标签
			</view>
			<view class="action" @tap.stop="showClearModalDialog">
				<view class="cuIcon-delete">
					<view v-if="items.length > 0" class="cu-tag badge">水调歌头粉色{{items.length}}</view>
				</view>
				清空
			</view>
			<view class="bg-red light submit" @click.stop="showModal" data-target="DialogModalAdd">添加商品</view>
			<view class="bg-mauve submit" @click="computedHeight">保存</view>
		</view>
		<!-- 日期/时间选择对话框 -->
		<view class="cu-modal bottom-modal" :class="dateModal?'show':''" @tap="hideDateModal">
			<view class="cu-dialog" @tap.stop="">
				<view
					class="flex align-center justify-between padding-lr-lg padding-tb-sm bg-white solid-bottom text-lg">
					<text @tap.stop.prevent="hideDateModal" class="text-green">取消</text>
					<text class="text-orange" @tap.stop.prevent="pickerConfirm">确定</text>
				</view>
				<date-picker :startYear="startYear" fields="second" :current="current" :value="initDateTime"
					@change="handlerChange" @touchstart="touchStart" @touchend="touchEnd">
				</date-picker>
			</view>
		</view>
		<!-- 清空商品对话框 -->
		<view class="cu-modal" :class="clearModalDialog?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="content">删除提示</view>
				</view>
				<view class="padding-xl bg-white text-bold">
					<text>此操作将清除已添加的所有商品！</text>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-green" @tap="hideClearModalDialog">取消</view>
					<view class="action margin-0 flex-sub solid-left" @tap="clearItems">确定</view>
				</view>
			</view>
		</view>
		<!-- 添加商品明细模态对话框 -->
		<view class="cu-modal bottom-modal" :class="addOrEditItemModalDialog?'show':''">
			<view class="cu-dialog">
				<view @tap="hideModal" class="bg-white text-right padding-tb-sm padding-lr-lg">
					<text class="cuIcon-close text-red text-bold text-xl"></text>
				</view>
				<view class="bg-purple light text-left">
					<view v-if="addSign" class="cu-bar search">
						<view class="search-form radius">
							<text class="cuIcon-search"></text>
							<input v-model="scanResult" :adjust-position="false" placeholder="请输入商品条码、名称、拼音"
								confirm-type="search" @confirm="searchConfirm"></input>
							<text class="cuIcon-scan text-blue text-bold" @tap.stop="scan"></text>
						</view>
						<view class="action text-white">
							<text class="cuIcon-close "></text>
							<text @click="searchCancel">取消</text>
							<text class="cuIcon-goods margin-left-xs" @tap.stop="query"></text>
						</view>
					</view>
					<view class="flex justify-between padding-lr-sm" :class="addSign?'':'padding-top-sm'">
						<text class="text-bold">品名：{{item.name||'--'}}</text>
						<text class="icon-unit text-blue" @tap.stop="showUnitDrawerModal"></text>
					</view>
					<view class="flex justify-between padding-lr-sm padding-tb-xs">
						<text v-if="item.plu">plu号：{{item.plu}}</text>
						<text v-else>商品条码：{{item.barcode||'--'}}</text>
						<text>规格：{{item.specs||'--'}}</text>
					</view>
					<view class="grid col-3 padding-tb-sm margin-lr-sm radius margin-bottom-xs"
						style="background-color: #7918F2;color:#fff">
						<view class='cu-item padding-left-sm flex flex-direction'>
							<text class="cuIcon-vip"
								@click.stop="this.$util.toast('普通用户定位到省，vip用户定位到周边3-5KM')">区域参考售价</text>
							<text
								class="text-lg text-bold text-cyan text-price padding-tb-xs">{{item.vip.referenceSalePrice||'--'}}</text>
						</view>
						<view class='cu-item padding-left-sm flex flex-direction'>
							<text class="cuIcon-vip"
								@click.stop="this.$util.toast('普通用户定位到省，vip用户定位到周边3-5KM')">区域参考进价</text>
							<text
								class="text-lg text-bold text-cyan text-price padding-tb-xs">{{item.vip.referencePurchasePrice||'--'}}</text>
						</view>
						<view class='cu-item padding-left-sm flex flex-direction'>
							<text>最近入库价</text>
							<text
								class="text-lg text-bold text-price padding-tb-xs text-yellow">{{item.storage.lastPurchasePrice||'--'}}</text>
						</view>
						<view class='cu-item padding-left-sm flex flex-direction'>
							<text class="padding-tb-xs">库存数量</text>
							<text class="text-lg text-bold text-pink">{{item.storage.number||'--'}}</text>
						</view>
						<view class='cu-item padding-left-sm flex flex-direction'>
							<text class="padding-tb-xs">库存金额</text>
							<text class="text-lg text-bold text-pink text-price">{{item.storage.amount||'--'}}</text>
						</view>
						<view class='cu-item padding-left-sm flex flex-direction'>
							<text class="padding-tb-xs cuIcon-question">存货周转率</text>
							<text class="text-lg text-bold text-green">{{item.storage.stockTurn||'--'}}</text>
						</view>
					</view>
					<view class="flex flex-direction margin-lr-sm">
						<view>
							<text class="cuIcon-sponsor margin-right-xs text-orange"></text>
							<text class="text-black">零售价</text>
						</view>
						<view class="grid col-2 align-center">
							<view>
								<text>原：</text>
								<badge v-if="item.retailPrice" :count="'毛利率：'+ oldRetailGrossProfitRate">
									<text class="text-price text-blue"
										:style="newRetailPrice||item.newRetailPrice?'text-decoration:line-through':''">{{item.retailPrice}}</text>
								</badge>
								<text v-else class="text-price text-blue">--</text>
							</view>
							<view class="flex align-center">
								<text>现：</text>
								<text class="text-price"></text>
								<badge v-if="item.newRetailPrice||newRetailPrice" :count="'毛利率：'+ retailGrossProfitRate"
									class="solid-bottom text-red basis-sm">
									<input :placeholder="item.newRetailPrice" type="digit" @blur="blur('sale',$event)"
										:value="newRetailPrice||''"></input>
								</badge>
								<input v-else :placeholder="item.newRetailPrice" type="digit"
									@blur="blur('sale',$event)" class="solid-bottom text-red basis-xl"></input>
							</view>
						</view>
					</view>
					<view class="flex flex-direction margin-lr-sm">
						<view>
							<text class="cuIcon-my text-orange margin-right-xs"></text>
							<text class="text-black">会员价</text>
						</view>
						<view class="grid col-2 align-center">
							<view>
								<text>原：</text>
								<badge v-if="item.memberPrice" :count="'毛利率：'+ oldMemberGrossProfitRate">
									<text class="text-price text-blue"
										:style="newMemberPrice||item.newMemberPrice?'text-decoration:line-through':''">{{item.memberPrice}}</text>
								</badge>
								<text v-else class="text-price text-blue">--</text>
							</view>
							<view class="flex align-center">
								<text>现：</text>
								<text class="text-price"></text>
								<badge v-if="memberGrossProfitRate" :count="'毛利率：'+ memberGrossProfitRate"
									class="solid-bottom text-red basis-sm">
									<input :placeholder="item.newMemberPrice" v-model="newMemberPrice" type="digit"
										@blur="blur('member')"></input>
								</badge>
								<input v-else :placeholder="item.newMemberPrice" type="digit" v-model="newMemberPrice"
									@blur="blur('member')" class="solid-bottom text-red basis-xl"></input>
							</view>
						</view>
					</view>
					<view class="flex flex-direction margin-lr-sm">
						<view>
							<text class="cuIcon-vip text-orange margin-right-xs"></text>
							<text class="text-black">PLUS会员价</text>
						</view>
						<view class="grid col-2 align-center">
							<view>
								<text>原：</text>
								<badge v-if="item.vipPrice" :count="'毛利率：'+ oldVipGrossProfitRate">
									<text class="text-price text-blue"
										:style="newVipPrice||item.newVipPrice?'text-decoration:line-through':''">{{item.vipPrice}}</text>
								</badge>
								<text v-else class="text-price text-blue">--</text>
							</view>
							<view class="flex align-center">
								<text>现：</text>
								<text class="text-price"></text>
								<badge v-if="vipGrossProfitRate" :count="'毛利率：'+ vipGrossProfitRate"
									class="solid-bottom text-red basis-sm">
									<input :placeholder="item.newVipPrice" v-model="newVipPrice" type="digit"
										@blur="blur('vip')"></input>
								</badge>
								<input v-else :placeholder="item.newVipPrice" type="digit" v-model="newVipPrice"
									@blur="blur('vip')" class="solid-bottom text-red basis-xl"></input>
							</view>
						</view>
					</view>
					<view class="flex justify-end margin-right-sm padding-tb-sm">
						<button v-if="addSign" class="cu-btn block radius shadow confirmBtn bg-gradual-purple basis-sm"
							@tap.stop="addItem">
							<text class="cuIcon-add margin-right-sm"></text>增加</button>
						<button class="cu-btn block radius shadow confirmBtn bg-gradual-purple margin-left-xs"
							:class="addSign?'basis-sm':'basis-lg'" @tap.stop="saveItem">
							保存</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 单位选择抽屉框 -->
		<view class="cu-modal drawer-modal justify-end" :class="unitDrawerModal?'show':''" @tap="hideUnitDrawerModal">
			<view class="cu-dialog basis-lg bg-white" @tap.stop=""
				:style="[{top:140+'px',height:'calc(100vh - ' + 140 + 'px)'}]">
				<view class="padding-sm solid-bottom text-left">
					<text class="cuIcon-titles text-orange"></text>
					<text>重置价格单位</text>
				</view>
				<view class="units text-df">
					<block v-for="(unitItem, index) in units" :key="index">
						<text class="padding-tb-xs padding-lr text-center margin-top-sm"
							:class="unitItem===unit?'unitSelected text-red light bg-orange':'unit bg-grey'"
							@tap.stop="selectUnit(unitItem)">{{unitItem}}</text>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		formatDate,
		formatMoney
	} from '@/js_sdk/util.js';
	import catalog from '@/test/catalog_test_data.js'; //用例数据库
	let pattern = new RegExp(/\/?([\u4e00-\u9fa5]{1,2}|500g|kg|pcs)?$/);
	export default {
		data() {
			return {
				fold: true,
				currentShop: '泸州市龙马潭区嘉诚超市',
				remarks: null,

				dateModal: false,
				effectiveDateTime: null,
				startYear: null,
				initDateTime: null,
				confirmFlag: true,
				resultDate: {},

				unitDrawerModal: false,
				unit: null,
				units: [],

				clearModalDialog: false,

				addOrEditItemModalDialog: false,
				scanResult: null,

				items: [],
				item: null,
				addSign: false,
				newRetailPrice: null,
				newMemberPrice: null,
				newVipPrice: null,

				retailGrossProfitRate: '',
				memberGrossProfitRate: '',
				vipGrossProfitRate: '',
			}
		},
		onLoad(options) {
			let sign = options.sign || 'edit';
			let currentDate = new Date();
			this.effectiveDateTime = formatDate(currentDate, "yyyy-MM-dd hh:mm:ss");
			currentDate.setDate(currentDate.getDate() - 31);
			this.startYear = currentDate.getFullYear();
			this.units = catalog.units;
			//new RegExp("^([1-9][0-9]+(.[0-9]{1,4})?)/([\u4e00-\u9fa5]{1,2}|500g|kg|pcs)$", "i");
			//console.log("00564".replace(new RegExp(/^(0+)([0-9]+(\.[0-9]{0,})?$)/).$1, ""));
		},
		watch: {
			unit() {
				if (this.newRetailPrice)
					this.newRetailPrice = this.newRetailPrice.replace(pattern, '') + "/" + this.unit;
				if (this.newMemberPrice)
					this.newMemberPrice = this.newMemberPrice.replace(pattern, '') + "/" + this.unit;
				if (this.newVipPrice)
					this.newVipPrice = this.newVipPrice.replace(pattern, '') + "/" + this.unit;
				if (this.item) {
					if (this.item.newRetailPrice)
						this.item.newRetailPrice = this.item.newRetailPrice.replace(pattern, '') + "/" + this.unit;
					if (this.item.newMemberPrice)
						this.item.newMemberPrice = this.item.newMemberPrice.replace(pattern, '') + "/" + this.unit;
					if (this.item.newVipPrice)
						this.item.newVipPrice = this.item.newVipPrice.replace(pattern, '') + "/" + this.unit;
				}
			}
		},
		computed: {
			oldRetailGrossProfitRate: function() {
				if (this.item) {
					let cost = this.item.storage.lastPurchasePrice.replace(pattern, '');
					return this.computedGrossProfitRate(cost, this.item.retailPrice.replace(pattern, '')) + '%';
				}
			},
			oldMemberGrossProfitRate: function() {
				if (this.item) {
					let cost = this.item.storage.lastPurchasePrice.replace(pattern, '');
					return this.computedGrossProfitRate(cost, this.item.memberPrice.replace(pattern, '')) + '%';
				}
			},
			oldVipGrossProfitRate: function() {
				if (this.item) {
					let cost = this.item.storage.lastPurchasePrice.replace(pattern, '');
					return this.computedGrossProfitRate(cost, this.item.vipPrice.replace(pattern, '')) + '%';
				}
			},
		},
		methods: {
			foldClick() {
				this.fold = !this.fold;
			},
			showDateModal() {
				this.initDateTime = this.effectiveDateTime ? this.effectiveDateTime : formatDate(
					new Date(), "yyyy-MM-dd hh:mm:ss");
				this.dateModal = true;
			},
			hideDateModal() {
				this.dateModal = false;
			},
			touchStart() {
				if (this.timeout) {
					this.confirmFlag = false;
				}
			},
			touchEnd() {
				if (this.timeout) {
					setTimeout(() => {
						this.confirmFlag = true;
					}, 500)
				}
			},
			handlerChange(res) {
				let _this = this;
				_this.resultDate = {
					...res
				};
			},
			pickerConfirm() {
				if (!this.confirmFlag) {
					return;
				};
				this.dateModal = false;
				this.effectiveDateTime = formatDate(new Date(this.resultDate.value), "yyyy-MM-dd hh:mm:ss")
			},

			hideUnitDrawerModal() {
				this.unitDrawerModal = false;
			},
			showUnitDrawerModal() {
				this.unitDrawerModal = true;
			},
			selectUnit(v) {
				this.unitDrawerModal = false;
				if (this.item)
					this.unit = v;
			},
			showModal(event) {
				this.addOrEditItemModalDialog = this.addSign = true;
				//this.modalName = event.currentTarget.dataset.target;
			},
			hideModal(v) {
				if (!this.addSign)
					this.clearItem();
				this.addOrEditItemModalDialog = false;
			},
			editItem(key) {
				let that = this;
				that.addSign = false;
				this.addOrEditItemModalDialog = true;
				for (const i of that.items) {
					if (i.id === key || i.plu === key) {
						that.item = i;
						that.unit = pattern.exec(i.retailPrice)[1];
						let cost = that.item.storage.lastPurchasePrice.replace(pattern, '');
						if (that.item.newRetailPrice) {
							that.retailGrossProfitRate = that.computedGrossProfitRate(cost, that.item.newRetailPrice
								.replace(pattern, '')) + '%';
						}
						if (that.item.newMemberPrice) {
							that.memberGrossProfitRate = that.computedGrossProfitRate(cost, that.item.newMemberPrice
								.replace(pattern, '')) + '%';
						}
						if (that.item.newVipPrice) {
							that.vipGrossProfitRate = that.computedGrossProfitRate(cost, that.item.newVipPrice
								.replace(pattern, '')) + '%';
						}
						break;
					}
				}
			},
			deleteItem(key) {
				var that = this;
				let index = 0;
				for (const item of that.items) {
					if (item.id === key || item.plu === key) {
						that.items.splice(index, 1);
						break;
					}
					index += 1;
				}
			},
			blur(sign, event) {
				let cost = this.item ? this.item.storage.lastPurchasePrice.replace(pattern, '') : 0;
				switch (sign) {
					case 'sale':
						this.newRetailPrice = event.target.value;
						//console.log(event.target.value);
						if (this.newRetailPrice) {
							let temp = this.newRetailPrice.replace(pattern, '');
							this.retailGrossProfitRate = this.computedGrossProfitRate(cost, temp) + '%';
							this.newRetailPrice = formatMoney(temp) + "/" + (this.unit || 'pcs');
						} else {
							this.retailGrossProfitRate = '';
						}
						break;
					case 'member':
						if (this.newMemberPrice) {
							let temp = this.newMemberPrice.replace(pattern, '');
							this.memberGrossProfitRate = this.computedGrossProfitRate(cost, temp) + '%';
							this.newMemberPrice = formatMoney(temp) + "/" + (this.unit || 'pcs');
						} else {
							this.memberGrossProfitRate = '';
						}
						break;
					case 'vip':
						if (this.newVipPrice) {
							let temp = this.newVipPrice.replace(pattern, '');
							this.vipGrossProfitRate = this.computedGrossProfitRate(cost, temp) + '%';
							this.newVipPrice = formatMoney(temp) + "/" + (this.unit || 'pcs');
						} else {
							this.vipGrossProfitRate = '';
						}
						break;
				}
			},
			computedGrossProfitRate(cost, price) {
				if (cost === 0 || cost === '0')
					return '100';
				if (price === 0 || price === '0' || price === '0.00' || price === '0.0')
					return '0';
				let difference = price - cost;
				return (difference / price * 100).toFixed(2);
			},
			searchConfirm() {
				var that = this;
				that.clearItem();
				for (const i of catalog.catalog) {
					if (i.barcode == that.scanResult || i.plu == that.scanResult) {
						that.unit = pattern.exec(i.retailPrice)[1];
						that.item = {
							name: i.name,
							specs: i.specs,
							vip: {
								referenceSalePrice: i.vip.referenceSalePrice,
								referencePurchasePrice: i.vip.referencePurchasePrice,
							},
							storage: {
								lastPurchasePrice: i.storage.lastPurchasePrice,
								amount: i.storage.amount,
								number: i.storage.number,
								stockTurn: i.storage.stockTurn,
							},
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
			searchCancel() {
				this.scanResult = null;
			},
			addItem() {
				var that = this;
				if (!that.item || (!that.newRetailPrice && !that.newMemberPrice && !that.newVipPrice)) {
					that.$util.toast("单价未改变，没有商品被加入调价单！");
					return;
				}
				for (const i of that.items) {
					if ((i.id && i.id === that.item.id) || (i.plu && i.plu === that.item.plu)) {
						that.$util.toast("编码" + (i.id || i.plu) + "的商品已存在，单据不允许重复录入！");
						return;
					}
				}
				if (that.newRetailPrice) {
					that.item = {
						newRetailPrice: that.newRetailPrice,
						...that.item
					};
				}
				if (that.newMemberPrice) {
					that.item = {
						newMemberPrice: that.newMemberPrice,
						...that.item
					};
				}
				if (that.newVipPrice) {
					that.item = {
						newVipPrice: that.newVipPrice,
						...that.item
					};
				}
				that.items.push(that.item);
				that.clearItem();
				that.scanResult = null;
			},
			saveItem() {
				this.addOrEditItemModalDialog = false;
				this.addItem();
			},

			showClearModalDialog() {
				if (this.items.length > 0)
					this.clearModalDialog = true;
			},
			hideClearModalDialog() {
				this.clearModalDialog = false;
			},
			clearItem() {
				var that = this;
				that.item = that.unit = null;
				that.newRetailPrice = that.newMemberPrice = that.newVipPrice = '';
				that.retailGrossProfitRate = that.memberGrossProfitRate = that.vipGrossProfitRate = '';
			},
			clearItems() {
				this.items = [];
				this.hideClearModalDialog();
			},

			computedHeight() {
				let query = uni.createSelectorQuery().in(this);
				query.select('#navBar').boundingClientRect().exec(rect => {
					//console.log(rect);
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

<style scoped lang='scss'>
	.price_adjustment_add {
		width: 100vw;
		height: 100vh;
		background-color: rgba(191, 200, 217, 0.3);
	}

	.grid-item-container {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;

		.shop1 {
			width: 22%;
		}

		.shop2 {
			flex: 1;
		}
	}

	.remarks {
		flex: 1;
		border-radius: 10rpx;
		background-color: rgba(32, 32, 32, .35);
		padding: 0 20rpx;
		color: #dbdbdb;
		text-overflow: ellipsis;
	}

	.tips {
		font-size: 164rpx;
	}

	.drag {
		font-size: 48rpx;
	}

	.bottom {
		position: fixed;
		bottom: 0;
		width: 100vw;
	}

	.units {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 0rpx 12rpx;

		.unit {
			border-radius: 3px;
			border: 1rpx solid #9b9b9b;
			margin-right: 14rpx;
		}

		.unitSelected {
			border-radius: 3px;
			border: 1rpx solid #fbbd08;
			margin-right: 14rpx;
		}
	}
</style>
