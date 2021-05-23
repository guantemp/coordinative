<template>
	<view>
		<navBar title="商品新增" :backgroundColor="[1, ['#6B73FF', '#000DFF', 135]]" :titleFont="['#FFF']" id="navBar">
		</navBar>
		<view class="cu-form-group padding-lr-sm">
			<view class="title">商品条码<text class="text-red margin-left-xs">*</text></view>
			<input name="barcode"></input>
			<view class="cu-capsule radius ">
				<view class='cu-tag bg-blue text-lg'>
					<text class='cuIcon-scan text-white'></text>
				</view>
				<view class="cu-tag line-blue  text-df">
					<text>生成</text>
				</view>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">商品名称<text class="text-red margin-left-xs">*</text></view>
			<input name="name"></input>
			<text class="cuIcon-more"></text>
		</view>
		<view class="cu-form-group">
			<view class="title">商品类别<text class="text-red margin-left-xs">*</text></view>
			<input placeholder="未定义" name="category"></input>
			<text class="cuIcon-more"></text>
		</view>
		<view class="cu-form-group">
			<view class="title">商品规格<text class="text-red margin-left-xs">*</text></view>
			<input name="specs"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">商品产地<text class="text-red margin-left-xs">*</text></view>
			<input name="placeOfOrigin"></input>
			<text class="cuIcon-right" @tap.stop="showOriginModal"></text>
		</view>
		<view class="cu-form-group">
			<view class="title">参考进价</view>
			<input placeholder="¥0.00/PCS" name="urchasePrice"></input>
			<text class="icon-unit text-orange" @tap.stop="showUnitDrawerModal"></text>
		</view>
		<view class="cu-form-group">
			<view class="title">零&nbsp;售&nbsp;价</view>
			<input placeholder="¥0.00/PCS" name="retailPrice"></input>
			<text class="icon-unit text-orange" @tap.stop="showUnitDrawerModal"></text>
		</view>
		<view class="cu-form-group">
			<view class="title">保&nbsp;质&nbsp;期</view>
			<input placeholder="0天" name="placeOfOrigin"></input>
			<text class="cuIcon-right"></text>
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
		<!-- 产地选择对话框 -->
		<view class="cu-modal bottom-modal" :class="originModal?'show':''" @tap="hideOriginModal">
			<view class="cu-dialog" @tap.stop="" style="height:520rpx">
				<view
					class="flex align-center justify-between padding-lr-lg padding-tb-sm bg-white solid-bottom text-lg">
					<text @tap.stop.prevent="hideOriginModal">取消</text>
					<text class="text-orange" @tap.stop.prevent="pickerConfirm">确定</text>
				</view>
				<region-picker></region-picker>
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
	export default {
		data() {
			return {
				imgList: [],

				unitDrawerModal: false,
				unit: null,
				units: [],

				originModal: false,
			}
		},
		onLoad(options) {
			let id = options.id || '';
			let plu = options.plu || '';
			console.log(id || plu);
		},
		methods: {
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
			hideUnitDrawerModal() {
				this.unitDrawerModal = false;
			},
			showUnitDrawerModal() {
				this.unitDrawerModal = true;
			},

			hideOriginModal() {
				this.originModal = false;
			},
			showOriginModal() {
				this.originModal = true;
			}
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
</style>
