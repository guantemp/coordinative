<template>
	<view class="price_adjustment_add">
		<navBar title="调价明细" :backgroundColor="[1, ['#AC32E4', '#7918F2', -225]]" tabPage="/pages/index/index"
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
							<text class="shop2">{{effectiveDate}}</text>
							<text class="cuIcon-calendar" @click="showDateModal"></text>
						</view>
						<view class="grid-item-container">
							<text class="shop1">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</text>
							<input v-model="remarks" type="text" class="remarks shop2"
								placeholder-style="color:#dbdbdb;" />
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
		<scroll-view scroll-y :scroll-with-animation="true" :enable-back-to-top="true"
			:style="{height: fold?'calc(100vh - 190px)':'calc(100vh - 125px)'}">
			<block v-for="(item,index) in items" :key="index">
				<view class="flex flex-direction radius margin-xs bg-white light ">
					<view class='flex justify-between padding-lr-sm padding-top-sm align-center'>
						<text class="text-bold">品名：{{items[index].name}}</text>
						<view>
							<text class="cuIcon-edit text-red margin-right-xs"
								@click='editItem(items[index].id||items[index].plu)'></text>
							<text class="cuIcon-delete text-blue"
								@click="deleteItem(items[index].id||items[index].plu)"></text>
						</view>
					</view>
					<view class="flex justify-between padding-lr-sm margin-tb-xs dashed-bottom">
						<text v-if="items[index].barcode">商品条码：{{items[index].barcode}}</text>
						<text v-if="items[index].plu">plu号：{{items[index].plu}}</text>
						<text>规格：{{items[index].specs}}</text>
					</view>
					<view
						v-if="(items[index].newRetailPrice&&items[index].newMemberPrice)||(items[index].newRetailPrice&&items[index].newVipPrice)||(items[index].newMemberPrice&&items[index].newVipPrice)"
						class='grid col-3'>
						<view class='cu-item padding-left flex flex-direction'>
							<text>原零售价</text>
							<text
								class="text-lg text-cyan text-price  padding-tb-xs">{{items[index].retailPrice||'--'}}</text>
						</view>
						<view class='cu-item padding-left flex flex-direction'>
							<text>原会员价</text>
							<text
								class="text-lg text-cyan text-price padding-tb-xs">{{items[index].memberPrice||'--'}}</text>
						</view>
						<view class='cu-item padding-left flex flex-direction'>
							<text>原VIP价</text>
							<text
								class="text-lg text-cyan text-price padding-tb-xs">{{items[index].vipPrice||'--'}}</text>
						</view>
						<view class='cu-item padding-left flex flex-direction'>
							<text>现零售价</text>
							<text
								class="text-lg text-red text-price padding-tb-xs">{{items[index].newRetailPrice||'--'}}</text>
						</view>
						<view class='cu-item padding-left  flex flex-direction'>
							<text>现会员价</text>
							<text
								class="text-lg text-red text-price padding-tb-xs">{{items[index].newMemberPrice||'--'}}</text>
						</view>
						<view class='cu-item padding-left flex flex-direction'>
							<text>现VIP价</text>
							<text
								class="text-lg text-red text-price padding-tb-xs">{{items[index].newVipPrice||'--'}}</text>
						</view>
					</view>
					<block v-else>
						<view v-if="items[index].newRetailPrice" class="grid col-2">
							<view class='cu-item padding-left-lg flex flex-direction'>
								<text>原零售价</text>
								<text
									class="text-lg text-cyan text-price padding-tb-xs">{{items[index].retailPrice}}</text>
							</view>
							<view class='cu-item padding-left-lg flex flex-direction'>
								<text>现零售价</text>
								<text
									class="text-lg text-orange text-price padding-tb-xs">{{items[index].newRetailPrice}}</text>
							</view>
						</view>
						<view v-else-if="items[index].newMemberPrice" class="grid col-2">
							<view class='cu-item padding-left-lg flex flex-direction'>
								<text>原会员价</text>
								<text
									class="text-lg text-cyan text-price padding-tb-xs">{{items[index].memberPrice}}</text>
							</view>
							<view class='cu-item padding-left-lg flex flex-direction'>
								<text>现会员价</text>
								<text
									class="text-lg text-orange text-price padding-tb-xs">{{items[index].newMemberPrice}}</text>
							</view>
						</view>
						<view v-else class="grid col-2">
							<view class='cu-item padding-left-lg flex flex-direction'>
								<text>原Vip价</text>
								<text
									class="text-lg text-cyan text-price padding-tb-xs">{{items[index].vipPrice}}</text>
							</view>
							<view class='cu-item padding-left-lg flex flex-direction'>
								<text>现Vip价</text>
								<text
									class="text-lg text-orange text-price padding-tb-xs">{{items[index].newVipPrice}}</text>
							</view>
						</view>
					</block>
				</view>
			</block>
		</scroll-view>

		<!--bootom-->
		<view class="bottom cu-bar bg-white tabbar border shop">
			<view class="action" @tap.stop="this.$util.navTo('/pages/workflow/label/label')">
				<view class="icon-label-print margin-bottom-xs" style="font-size: 38rpx"></view>打印标签
			</view>
			<view class="action" @tap.stop="clearItems">
				<view class="cuIcon-delete">
					<view v-if="items.length > 0" class="cu-tag badge">{{items.length}}</view>
				</view>
				清空
			</view>
			<view class="bg-red light submit" @click.stop="showModal" data-target="DialogModalAdd">添加商品</view>
			<view class="bg-mauve submit" @click="computedHeight">保存</view>
		</view>

		<!-- 日期选择 -->
		<view class="cu-modal bottom-modal" :class="dateModal?'show':''" @tap="hideDateModal">
			<view class="cu-dialog" @tap.stop="">
				<view
					class="flex align-center justify-between padding-lr-lg padding-tb-sm bg-white solid-bottom text-lg">
					<text @tap.stop.prevent="hideDateModal">取消</text>
					<text class="text-orange" @tap.stop.prevent="pickerConfirm">确定</text>
				</view>
				<date-picker :startYear="2021" fields="second" :current="current" :value="initDate"
					@change="handlerChange" @touchstart="touchStart" @touchend="touchEnd">
				</date-picker>
			</view>
		</view>

		<!-- 添加商品明细模态对话框 -->
		<view class="cu-modal bottom-modal" :class="modalName=='DialogModalAdd'?'show':''">
			<view class="cu-dialog">
				<view @tap="hideModal" class="bg-white text-right padding-tb-sm padding-lr-lg">
					<text class="cuIcon-close text-red text-bold text-xl"></text>
				</view>
				<view class="bg-purple light text-left">
					<view v-if="addSign" class="cu-bar search">
						<view class="search-form radius">
							<text class="cuIcon-search"></text>
							<input v-model="scanResult" :adjust-position="false" focus placeholder="请输入商品条码、名称、拼音"
								confirm-type="search" @confirm="serchConfirm"></input>
							<text class="cuIcon-scan text-blue text-bold" @tap="scan"></text>
						</view>
						<view class="action text-white">
							<text class="cuIcon-close "></text>
							<text @click="modalCancel">取消</text>
							<text class="cuIcon-filter margin-left-xs" @tap.stop="query"></text>
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
					<view class="grid col-3 bg-purple padding-tb-sm margin-lr-sm radius margin-bottom-xs">
						<view class='cu-item padding-left-sm flex flex-direction'>
							<text class="cuIcon-vip" @click="showVip">区域参考售价</text>
							<text
								class="text-lg text-bold text-cyan text-price padding-tb-xs">{{item.vip.referenceSalePrice||'--'}}</text>
						</view>
						<view class='cu-item padding-left-sm flex flex-direction'>
							<text class="cuIcon-vip" @click="showVip">区域参考进价</text>
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
						<view class="flex justify-between align-center">
							<view style="flex-basis:35%">
								<text>原：</text>
								<text class="text-price text-blue"
									:style="(item.retailPrice||item.retailPrice.old)?'text-decoration:line-through':''">{{item.retailPrice||item.retailPrice.old||'--'}}</text>
							</view>
							<view class="flex align-center" style="flex-basis:35%">
								<text>现：</text>
								<text class="text-price"></text>
								<input :placeholder="item.retailPrice.new" type="digit" v-model="newRetailPrice"
									@blur="blur('sale')" class="solid-bottom basis-xl text-red"></input>
							</view>
							<view class="flex align-center" style="flex-basis:30%">
								<text>毛利率：</text>
								<text class="text-black">{{retailGrossProfitRate}}</text>
							</view>
						</view>
					</view>
					<view class="flex flex-direction margin-lr-sm">
						<view>
							<text class="cuIcon-my text-orange margin-right-xs"></text>
							<text class="text-black">会员价</text>
						</view>
						<view class="flex justify-between align-center">
							<view style="width: 35%">
								<text>原：</text>
								<text class="text-price text-blue"
									:style="(item.memberPrice||item.memberPrice.old)?'text-decoration:line-through':''">{{item.memberPrice||item.memberPrice.old||'--'}}</text>
							</view>
							<view class="flex align-center" style="flex-basis:35%">
								<text>现：</text>
								<text class="text-price"></text>
								<input :placeholder="item.memberPrice.new" v-model="newMemberPrice" type="digit"
									@blur="blur('member')" class="solid-bottom basis-xl text-red"></input>
							</view>
							<view class="flex align-center" style="flex-basis:30%">
								<text>毛利率：</text>
								<text class="text-black">{{memberGrossProfitRate}}</text>
							</view>
						</view>
					</view>
					<view class="flex flex-direction margin-lr-sm">
						<view>
							<text class="cuIcon-vip text-orange margin-right-xs"></text>
							<text class="text-black">VIP价</text>
						</view>
						<view class="flex justify-between align-center">
							<view style="width: 35%">
								<text>原：</text>
								<text class="text-price text-blue"
									:style="(item.vipPrice||item.vipPrice.old)?'text-decoration:line-through':''">{{item.vipPrice||item.vipPrice.old||'--'}}</text>
							</view>
							<view class="flex align-center" style="flex-basis:35%">
								<text>现：</text>
								<text class="text-price"></text>
								<input :placeholder="item.vipPrice.new" v-model="newVipPrice" type="digit"
									@blur="blur('vip')" class="solid-bottom basis-xl text-red"></input>
							</view>
							<view class="flex align-center" style="flex-basis:30%">
								<text>毛利率：</text>
								<text class="text-black">{{vipGrossProfitRate}}</text>
							</view>
						</view>
					</view>
					<view class="flex justify-end margin-right-sm padding-tb-sm">
						<button v-if="addSign" class="cu-btn block radius shadow confirmBtn bg-gradual-purple basis-sm"
							@tap.stop="addItem">
							<text class="cuIcon-add margin-right-sm"></text>增加</button>
						<button class="cu-btn block radius shadow confirmBtn bg-gradual-purple margin-left-xs"
							:class="addSign?'basis-sm':'basis-lg'"
							@tap.stop="this.$util.navTo('/pages/workflow/price_adjustment_add')">
							保存</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 单位选择抽屉 -->
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
	export default {
		data() {
			return {
				fold: true,
				currentShop: '泸州市龙马潭区嘉诚超市',
				remarks: null,

				dateModal: false,
				effectiveDate: null,
				initDate: null,
				confirmFlag: true,
				resultDate: {},

				unitDrawerModal: false,

				modalName: null,
				scanResult: null,

				items: [],
				item: null,
				addSign: false,
				unit: 'PCS',
				units: [],
				newRetailPrice: null,
				newMemberPrice: null,
				newVipPrice: null,
				retailGrossProfitRate: '',
				memberGrossProfitRate: '',
				vipGrossProfitRate: '',
			}
		},
		onLoad: function() {
			setTimeout(() => {
				this.effectiveDate = formatDate(new Date(), "yyyy-MM-dd 00:00:00");
			}, 300);
			this.units = catalog.units;
			let patt = new RegExp(/\/?([\u4e00-\u9fa5]{1,2}|500g|kg|pcs)?$/);
			console.log("".replace(patt, ''));
		},
		watch: {
			item() {
				if (this.item) {
					let patt = new RegExp("^([1-9][0-9]+(.[0-9]{1,4})?)/([\u4e00-\u9fa5]{1,2}|500g|kg|pcs)$", "i");
				}
			},
			unit() {
				let pattern = new RegExp(/\/?([\u4e00-\u9fa5]{1,2}|500g|kg|pcs)?$/);
				if (this.newRetailPrice)
					this.newRetailPrice = this.newRetailPrice.replace(pattern, '') + "/" + this.unit;
				if (this.newMemberPrice)
					this.newMemberPrice = this.newMemberPrice.replace(pattern, '') + "/" + this.unit;
				if (this.newVipPrice)
					this.newVipPrice = this.newVipPrice.replace(pattern, '') + "/" + this.unit;
			}
		},
		methods: {
			foldClick() {
				this.fold = !this.fold;
			},

			showDateModal() {
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
				this.resultDate = {
					...res
				};
			},
			pickerConfirm() {
				if (!this.confirmFlag) {
					return;
				};
				this.dateModal = false;
				this.effectiveDate = formatDate(new Date(this.resultDate.value), "yyyy-MM-dd hh:mm:ss")
			},

			hideUnitDrawerModal() {
				this.unitDrawerModal = false;
			},
			showUnitDrawerModal() {
				this.unitDrawerModal = true;
			},
			selectUnit(v) {
				this.unitDrawerModal = false;
				this.unit = v;
			},

			showModal(event) {
				this.addSign = true;
				this.modalName = event.currentTarget.dataset.target;
				if (this.item) {
					let pattern = new RegExp(/\/?([\u4e00-\u9fa5]{1,2}|500g|kg|pcs)?$/);
					let cost = this.item.storage.lastPurchasePrice.replace(pattern, '');
					if (this.item.retailPrice.new)
						this.retailGrossProfitRate = this.computedGrossProfitRate(cost, this.item.retailPrice.new.replace(
							pattern, ''));
					if (this.item.memberPrice.new)
						this.memberGrossProfitRate = this.computedGrossProfitRate(cost, this.item.memberPrice.new.replace(
							pattern, ''));
					if (this.item.vipPrice.new)
						this.vipGrossProfitRate = this.computedGrossProfitRate(cost, this.item.vipPrice.new.replace(
							pattern, ''));
				}
			},
			hideModal(v) {
				this.modalName = null;
			},
			editItem(key) {
				this.addSign = false;
				this.modalName = 'DialogModalAdd';
				console.log(key);
				for (const i of this.items) {
					if (i.id == key || i.plu == key) {
						this.item = i;
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
						that.serchConfirm();
					},
					fail: function(res) {
						console.log(JSON.stringify(res));
					},
				});
			},
			queryCancel() {
				this.scanResult = null;
			},
			showVip() {
				this.$util.toast("普通用户定位到省，vip用户定位到周边3-5KM");
			},
			blur(sign) {
				let pattern = new RegExp(/\/?([\u4e00-\u9fa5]{1,}|500g|kg|pcs)?$/);
				let cost = this.item ? this.item.storage.lastPurchasePrice.replace(pattern, '') :
					0;
				switch (sign) {
					case 'sale':
						if (this.newRetailPrice) {
							let temp = this.newRetailPrice.replace(pattern, '');
							this.retailGrossProfitRate = this.computedGrossProfitRate(cost, temp);
							this.newRetailPrice = formatMoney(temp) + "/" + this.unit;
						} else {
							this.retailGrossProfitRate = this.computedGrossProfitRate(cost, this.item.retailPrice.replace(
								pattern, ''));
						}
						break;
					case 'member':
						if (this.newMemberPrice) {
							let temp = this.newMemberPrice.replace(pattern, '');
							this.memberGrossProfitRate = this.computedGrossProfitRate(cost, temp);
							this.newMemberPrice = formatMoney(temp) + "/" + this.unit;
						} else {
							this.memberGrossProfitRate = this.computedGrossProfitRate(cost, this.item.memberPrice.replace(
								pattern, ""));
						}
						break;
					case 'vip':
						if (this.newVipPrice) {
							let temp = this.newVipPrice.replace(pattern, '');
							this.vipGrossProfitRate = this.computedGrossProfitRate(cost, temp);
							this.newVipPrice = formatMoney(temp) + "/" + this.unit;
						} else {
							this.vipGrossProfitRate = this.computedGrossProfitRate(cost, this.item.vipPrice.replace(
								pattern, ''));
						}
						break;
				}
			},
			computedGrossProfitRate(cost, price) {
				if (cost === 0 || cost === '0')
					return '100%';
				if (price === 0 || price === '0' || price === '0.00' || price === '0.0')
					return '0%';
				let difference = price - cost;
				return (difference / price * 100).toFixed(2) + '%';
			},
			serchConfirm() {
				var that = this;
				let patt = new RegExp(/\/?([\u4e00-\u9fa5]{1,2}|500g|kg|pcs)?$/);
				for (const i of catalog.catalog) {
					if (i.barcode == that.scanResult || i.plu == that.scanResult) {
						that.unit = patt.exec(i.retailPrice)[1];
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
						let cost = i.storage.lastPurchasePrice.replace(patt, '');
						that.retailGrossProfitRate = that.computedGrossProfitRate(cost, i.retailPrice.replace(patt, ''));
						that.memberGrossProfitRate = that.computedGrossProfitRate(cost, i.memberPrice.replace(patt, ''));
						that.vipGrossProfitRate = that.computedGrossProfitRate(cost, i.vipPrice.replace(patt, ''));
						break;
					}
				}
			},
			addItem() {
				var that = this;
				if (!that.item || (!that.newRetailPrice && !that.newMemberPrice && !that.newVipPrice)) {
					that.$util.toast("没有数据被改变，商品未被加入调价单！");
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
				that.newRetailPrice = '';
				that.newMemberPrice = '';
				that.newVipPrice = '';
				that.retailGrossProfitRate = '';
				that.memberGrossProfitRate = '';
				that.vipGrossProfitRate = '';
			},

			computedHeight() {
				let that = this;
				const query = uni.createSelectorQuery();
				query.select('#navBar').boundingClientRect(rect => {
					that.occupiedHeight = rect.height;
				}).exec();
				query.select('.bottom').boundingClientRect(rect => {
					that.occupiedHeight = that.occupiedHeight + rect.height;
				}).exec();
				this.$util.toast("height:" + this.occupiedHeight);
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


