<template>
	<view>
		<navBar :title="(plu||id)?'商品编辑':'商品新增'" :backgroundColor="[1, ['#6B73FF', '#000DFF', 135]]"
			:titleFont="['#FFF']" id="navBar">
		</navBar>
		<view class="cu-form-group padding-lr-sm">
			<view class="title">
				<text v-if='good.plu'>PLU码</text>
				<text v-else>商品条码</text>
				<text class="text-red margin-left-xs">*</text>
			</view>
			<input v-model="scanResult" :placeholder="good.plu||good.barcode||''" @blur="scanResultBlur"></input>
			<view class="cu-capsule radius ">
				<view class='cu-tag bg-blue text-lg' @tap.stop="scan">
					<text class='cuIcon-scan text-white'></text>
				</view>
				<view class="cu-tag line-blue text-df" @tap.stop="plu?generate('plu'):generate('barcode')">
					<text>生成</text>
				</view>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">商品名称<text class="text-red margin-left-xs">*</text></view>
			<input v-model="name" :placeholder="good.name||''"></input>
			<text class="cuIcon-more" @tap.stop="showAliasModalDialog" :class="alias?'text-red':''"></text>
		</view>
		<view class="cu-form-group">
			<view class="title">商品规格<text class="text-red margin-left-xs">*</text></view>
			<input v-model="specs" :placeholder="good.specs||'未定义'"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">商品等级<text class="text-red margin-left-xs">*</text></view>
			<input v-model="grade" :placeholder="grade||good.grade||'合格品'" disabled></input>
			<text class="cuIcon-more" @tap.stop="showGradeRadioDialog"></text>
		</view>
		<view class="cu-form-group">
			<view class="title">商品产地<text class="text-red margin-left-xs">*</text></view>
			<input v-model="placeOfOrigin" :placeholder="good.placeOfOrigin||''"></input>
			<text class="cuIcon-right" @tap.stop="showOriginDialog"></text>
		</view>
		<view class="cu-form-group">
			<view class="title">商品类别<text class="text-red margin-left-xs">*</text></view>
			<input :placeholder="good.category.name||'未定义'" v-model="category"></input>
			<text class="cuIcon-more"></text>
		</view>
		<view class="cu-form-group">
			<view class="title">参考进价</view>
			<input :placeholder="'¥0.00/PCS'" name="purchasePrice" type="digit"></input>
			<text class="icon-unit text-blue" @tap.stop="showUnitDrawerModal"></text>
		</view>
		<view class="cu-form-group">
			<view class="title">零&nbsp;&nbsp;售&nbsp;&nbsp;价</view>
			<input :placeholder="good.retailPrice?'¥'+ good.retailPrice:'¥0.00/PCS'" v-model="retailPrice"
				type="digit"></input>
			<text class="icon-unit text-blue" @tap.stop="showUnitDrawerModal"></text>
		</view>
		<view class="cu-form-group">
			<view class="title">保&nbsp;&nbsp;质&nbsp;&nbsp;期</view>
			<input :placeholder="good.shelfLife||'0天'" v-model="shelfLife" type="number" @blur="shelfLifeBlur"></input>
		</view>
		<view class="cu-bar bg-white">
			<view class="action title">商品图片</view>
			<view class="action">{{imgList.length}}/4</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="viewImage"
					:data-url="imgList[index]">
					<image :src="imgList[index]" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="delImg" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="solids" @tap="chooseImage" v-if="imgList.length<4">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
		</view>
		<view class="bottom">
			<button class="cu-btn radius shadow bg-gradual-green basis-sm"
				@tap.stop="this.$util.navTo('/pages/workflow/price/price_adjustment_add?sign=add')">
				保存并新增</button>
			<button class="cu-btn radius shadow bg-gradual-green basis-sm margin-left-sm"
				@tap.stop="this.$util.navTo('/pages/workflow/price/price_adjustment_add?sign=add')">
				保存</button>
		</view>
		<!-- 别名对话框 -->
		<view class="cu-modal" :class="aliasModalDialog?'show':''">
			<view class="cu-dialog">
				<view class="flex align-center solid-bottom padding text-left">
					<view class="margin-right-sm">商品别名：</view>
					<input type="text" :placeholder="good.name.alias||'请输入商品的另外一个名称'" v-model="alias"
						class="flex-sub"></input>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub" @tap="aliasModalDialogConfirm">好</view>
				</view>
			</view>
		</view>
		<!--商品等级对话框-->
		<view class="cu-modal" :class="gradeRadioDialog?'show':''" @tap="hideGradeRadioDialog">
			<view class="cu-dialog" @tap.stop="">
				<radio-group class="block" @change="gradeRadioChange">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in grades" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{item}}</view>
								<radio class="round" :class="gradeRadio === item?'checked':''"
									:checked="gradeRadio === item?true:false" :value="item"></radio>
							</label>
						</view>
					</view>
				</radio-group>
			</view>
		</view>
		<!-- 产地选择对话框 -->
		<view class="cu-modal bottom-modal" :class="originDialog?'show':''" @tap="hideOriginDialog">
			<view class="cu-dialog" @tap.stop="">
				<view
					class="flex align-center justify-between padding-lr-lg padding-tb-sm bg-white solid-bottom text-lg">
					<text @tap.stop.prevent="hideOriginDialog">取消</text>
					<text class="text-orange" @tap.stop.prevent="originDialogConfirm">确定</text>
				</view>i
				<region-picker @change="handlerChange" :value="initPlaceOfOrigin"></region-picker>
			</view>
		</view>
		<!-- 单位选择抽屉框 -->
		<view class="cu-modal drawer-modal justify-end" :class="unitDrawerModal?'show':''" @tap="hideUnitDrawerModal">
			<view class="cu-dialog basis-lg bg-white" @tap.stop=""
				:style="[{top:58+'px',height:'calc(100vh - ' + 58 + 'px)'}]">
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
	import catalog from '@/test/catalog_test_data.js'; //用例数据库
	export default {
		data() {
			return {
				good: {},
				id: '',
				plu: '',
				barcode: '',
				scanResult: '',
				name: '',
				alias: '',
				specs: '',
				grade: '合格品',
				regionResult: null,
				placeOfOrigin: '',
				category: null,
				retailPrice: '',
				imgList: [],

				aliasModalDialog: false,

				gradeRadioDialog: false,
				gradeRadio: '合格品',
				grades: [],

				originDialog: false,
				initPlaceOfOrigin: [],

				unitDrawerModal: false,
				unit: null,
				units: [],
				
				shelfLife:'',
			}
		},
		onLoad(options) {
			this.id = options.id || '';
			this.plu = options.plu || '';
			if (this.id || this.plu) {
				for (const item of catalog.catalog) {
					if (item.id === this.id || item.plu == this.plu) {
						this.good = item;
						break;
					}
				}
			}
			if (this.good !== {}) {
				let pattern = new RegExp(/\/?([\u4e00-\u9fa5]{1,2}|500g|kg|pcs)?$/);
				this.unit = pattern.exec(this.good.retailPrice)[1];
			}
			this.units = catalog.units;
			this.grades = catalog.grades;
			let pattern = new RegExp("^([\u4e00-\u9fa5]{1,}[省|市|自治区]?)\.([\u4e00-\u9fa5]{1,}[市|区|县|州|盟|地区]?)$", "i");
			let result = pattern.exec("内蒙古.呼和浩特")
			console.log(result);

		},
		watch: {
			unit() {
				let pattern = new RegExp(/\/?([\u4e00-\u9fa5]{1,2}|500g|kg|pcs)?$/);
				if (this.retailPrice) {
					this.retailPrice = this.retailPrice.replace(pattern, '') + "/" + this.unit;
					return;
				}
				if (this.good) {
					if (this.good.retailPrice)
						this.good.retailPrice = this.good.retailPrice.replace(pattern, '') + "/" + this.unit;
				}
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
			generate(sign) {
				console.log(sign);
			},
			scanResultBlur(sign) {

			},

			showAliasModalDialog() {
				this.aliasModalDialog = true;
			},
			aliasModalDialogConfirm() {
				this.aliasModalDialog = false;
			},

			showGradeRadioDialog() {
				this.gradeRadioDialog = true;
			},
			hideGradeRadioDialog() {
				this.gradeRadioDialog = false;
			},
			gradeRadioChange(event) {
				this.gradeRadio = event.detail.value;
				this.grade = this.gradeRadio;
			},

			hideOriginDialog() {
				this.originDialog = false;
			},
			showOriginDialog() {
				let pattern = new RegExp("^([\u4e00-\u9fa5]{1,}[省|市|自治区]?)\.([\u4e00-\u9fa5]{1,}[市|区|县|州|盟|地区]?)$", "i");
				let result = pattern.exec(this.good.placeOfOrigin);
				if (this.placeOfOrigin)
					result = pattern.exec(this.placeOfOrigin);
				if (result) {
					let province = ["北京市", "天津市", "上海市"];
					if (province.includes(result[1])) {
						this.initPlaceOfOrigin = [result[1], result[1], result[2]];
					} else if (result[1] === '重庆市') {
						let area = ["城口县", "丰都县", "垫江县", "忠县", "云阳县", "奉节县", "巫山县", "巫溪县", "石柱土家族自治县",
							"秀山土家族苗族自治县", "酉阳土家族苗族自治县", "彭水苗族土家族自治县"
						];
						if (area.includes(result[2])) //直辖县
							this.initPlaceOfOrigin = [result[1], '直辖县', result[2]];
						else
							this.initPlaceOfOrigin = [result[1], result[1], result[2]];
					} else if (result[1] === '新疆维吾尔自治区') {
						let area = ["石河子市", "阿拉尔市", "图木舒克市", "五家渠市", "北屯市", "铁门关市", "双河市", "可克达拉市", "昆玉市", "胡杨河市"];
						if (area.includes(result[2])) //直辖县
							this.initPlaceOfOrigin = [result[1], '直辖县', result[2]];
					} else if (result[1] === '海南省') {
						let area = ["五指山市", "琼海市", "文昌市", "万宁市", "东方市", "定安县", "屯昌县", "澄迈县", "临高县", "白沙黎族自治县", "昌江黎族自治县",
							"乐东黎族自治县", "陵水黎族自治县", "保亭黎族苗族自治县", "琼中黎族苗族自治县"
						];
						if (area.includes(result[2])) //直辖县
							this.initPlaceOfOrigin = [result[1], '直辖县', result[2]];
					} else if (result[1] === '湖北省') {
						let area = ["仙桃市", "潜江市", "天门市", "神农架林区"];
						if (area.includes(result[2])) //直辖县
							this.initPlaceOfOrigin = [result[1], '直辖县', result[2]];
					}
					if (this.initPlaceOfOrigin.length === 0) {
						this.initPlaceOfOrigin = [result[1], result[2]];
					}
				} else {
					this.initPlaceOfOrigin = [];
				}
				//console.log(this.initPlaceOfOrigin);
				this.originDialog = true;
			},
			handlerChange(res) {
				let _this = this;
				this.regionResult = {
					...res
				};
			},
			originDialogConfirm() {
				this.hideOriginDialog()
				let obj = this.regionResult.obj;
				console.log(obj.city);
				let province = ['110000', '120000', '310000', '500000'];
				let city = ['429000', '469000']
				if (province.includes(obj.province.value) || city.includes(obj.city.value)) {
					this.placeOfOrigin = obj.province.label + "." + obj.area.label;
				} else {
					this.placeOfOrigin = obj.province.label + "." + obj.city.label;
				}
			},

			hideUnitDrawerModal() {
				this.unitDrawerModal = false;
			},
			showUnitDrawerModal() {
				this.unitDrawerModal = true;
			},
			selectUnit(v) {
				this.unitDrawerModal = false;
				if (this.good)
					this.unit = v;
			},

			chooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera'], //开相机
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			viewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			delImg(e) {
				uni.showModal({
					title: '召唤师',
					content: '确定要删除这张图片？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
		}
	}
</script>

<style scoped lang='scss'>
	.smallBtn {
		border-width: 0px;
		outline: none;
	}

	.bottom {
		display: flex;
		justify-content: center;
		width: 100vw;
		position: fixed;
		bottom: 1.5vh;
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
