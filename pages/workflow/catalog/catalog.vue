<template>
	<view class="bg-white">
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
		<scroll-view scroll-x class="nav solid-bottom" scroll-with-animation :scroll-left="scrollLeft">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index===tabCur?'text-orange cur':''"
					v-for="(item,index) in category" :key="index" :data-id="index" @tap="tabSelect(item.id,$event)">
					<text>{{item.name}}</text>
					<text v-if="item.sub" class="cuIcon-triangledownfill category"
						@click="this.$util.toast('我还有子类哦')"></text>
				</view>
			</view>
		</scroll-view>
		<scroll-view scroll-y :scroll-with-animation="true" :enable-back-to-top="true"
			:style="{height: 'calc(100vh - 150px)'}">
			<slide :btnArr="btnArr" :items="catalog" @del="del">
				<template v-slot="{item}">
					<view class="flex padding-lr-sm padding-tb-xs align-center solid-top"
						@tap="item.id?navTo(item.id):navToScale(item.plu)">
						<view class="imageWrapper">
							<image class="good-img"
								:src="item.goodImg||(item.barcode?'/static/workflow/archives.png':'/static/workflow/plu.png')"
								mode="aspectFill" />
						</view>
						<view class="flex flex-direction flex-sub">
							<view class="text-cut">{{item.name}}</view>
							<view class="flex justify-between">
								<text v-if="item.barcode">条码：{{item.barcode}}</text>
								<text v-else>PLU号：{{item.plu}}</text>
								<text>规格：{{item.specs}}</text>
							</view>
							<view>
								产地：<text>{{item.placeOfOrigin}}</text>
							</view>
							<view>
								零售价：<text class="text-price text-red margin-right-sm">{{item.retailPrice}}</text>
								会员价：<text class="text-price text-red">{{item.memberPrice}}</text>
							</view>
						</view>
					</view>
				</template>
			</slide>
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
				btnArr: [{
					name: '删除',
					width: 200,
					background: '#ff5500',
					color: '#fff',
					events: 'del'
				}],
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
		},
		mounted: function() {
			this.$nextTick(() => {
				this.category = catalog.category;
				this.catalog = catalog.catalog;
			})
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
			},
			del(data) {
				console.log(data);
				this.$util.toast('删除：' + (data.id || data.plu));
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
