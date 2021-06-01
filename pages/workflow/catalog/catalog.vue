<template>
	<view>
		<navBar title="商品目录" :backgroundColor="[1, ['#6B73FF', '#000DFF', 135]]" :titleFont="['#FFF']" id="navBar"
			surplusHeight=43>
			<view slot="extendSlot" class="cu-bar search">
				<view class="search-form radius">
					<text class="cuIcon-search"></text>
					<input v-model="scanResult" :adjust-position="false" type="text" placeholder="请输入商品条码、名称、拼音助记码"
						confirm-type="search"></input>
					<text class="cuIcon-scan text-blue text-bold" @tap="scan"></text>
				</view>
				<view class="action text-white">
					<text class="cuIcon-close "></text>
					<text @click="computedScrollViewHeight">取消</text>
				</view>
			</view>
		</navBar>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index===tabCur?'text-orange cur':''"
					v-for="(item,index) in category" :key="index" :data-id="index" @tap="tabSelect(item.id,$event)">
					<text>{{item.name}}</text>
					<text v-if="item.sub" class="cuIcon-triangledownfill category"
						@click="this.$util.toast('我还有子类哦')"></text>
				</view>
			</view>
		</scroll-view>
		<scroll-view scroll-y :scroll-with-animation="true" :enable-back-to-top="true" class="solid-top"
			:style="{height: 'calc(100vh - 150px)'}">
			<view class="bg-white">
				<view :id="'good'+good.id" class="flex padding-lr-sm padding-tb-xs solid-top align-center"
					v-for="good in catalog" :key="good.id" @tap="good.id?navTo(good.id):navToScale(good.plu)">
					<view class="imageWrapper">
						<image class="good-img"
							:src="good.goodImg||(good.barcode?'/static/workflow/archives.png':'/static/workflow/plu.png')"
							mode="aspectFill" />
					</view>
					<view class="flex flex-direction flex-sub">
						<view class="text-cut">{{good.name}}</view>
						<view class="flex justify-between">
							<text v-if="good.barcode">条码：{{good.barcode}}</text>
							<text v-else>PLU号：{{good.plu}}</text>
							<text>规格：{{good.specs}}</text>
						</view>
						<view>
							产地：<text>{{good.placeOfOrigin}}</text>
						</view>
						<view>
							零售价：<text class="text-price text-red margin-right-sm">{{good.retailPrice}}</text>
							会员价：<text class="text-price text-red">{{good.memberPrice}}</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<uni-fab :pattern="fabPattern" :content="content" horizontal="right" vertical="bottom" direction="horizontal"
			@trigger="trigger"></uni-fab>
	</view>
</template>

<script>
	import catalog from '@/test/catalog_test_data.js'; //用例数据库
	export default {
		data() {
			return {
				scanResult: '',
				catalog: [],
				category: [],
				tabCur: 0,
				scrollLeft: 0,
				fabPattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
				},
				content: [{
						iconPath: '/static/workflow/new.png',
						selectedIconPath: '/static/workflow/new.png',
						text: '新增商品',
						active: false
					},
					{
						iconPath: '/static/workflow/new_kg.png',
						selectedIconPath: '/static/workflow/new_kg.png',
						text: '新增散秤',
						active: false
					},
					{
						iconPath: '/static/workflow/count.png',
						selectedIconPath: '/static/workflow/count.png',
						text: '商品类目',
						active: false
					}
				]
			}
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			this.category = catalog.category;
			this.catalog = catalog.catalog;
		},
		onReady() {
			uni.hideLoading()
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
			tabSelect(id, event) {
				this.tabCur = event.currentTarget.dataset.id;
				this.scrollLeft = (event.currentTarget.dataset.id - 1) * 60;
				for (const item of this.category) {
					if (id === item.id)
						console.log(item);
				}
			},
			trigger(e) {
				console.log(e);
				//this.content[e.index].active = !e.item.active
				if (e.index === 0) {
					this.$util.navTo('/pages/workflow/catalog/good');
				}
				if (e.index === 2) {
					this.$util.navTo('/pages/workflow/catalog/category');
				}
			},
			navTo(id) {
				this.$util.navTo('/pages/workflow/catalog/good?id=' + id);
			},
			navToScale(plu) {
				this.$util.navTo('/pages/workflow/catalog/good?plu=' + plu);
			}
		}
	}
</script>

<style scoped lang='scss'>
	.category {
		font-size: 90%;
		vertical-align: bottom;
	}

	.imageWrapper {
		width: 128rpx;
		height: 108rpx;
		display: flex;
		align-items: center;
	}

	.good-img {
		width: 98rpx;
		height: 98rpx;
	}
</style>
