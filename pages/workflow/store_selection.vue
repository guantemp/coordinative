<template>
	<view class="store">
		<!-- :backgroundColor="[1, ['#24bdab', '#80c54c', 45]]"  or :backgroundColor="['#80c54c']  btnType="tower" tabPage="/pages/index/index"-->
		<navBar :backgroundColor="[1, ['#9000ff', '#5e00ff', 45]]" :titleFont="['#FFF','center']"
			placeholder="请输入门店名称/全拼/首字母">
		</navBar>
		<scroll-view scroll-y class="indexes" :scroll-into-view="'indexes-'+ listCurID"
			:style="{height:'calc(100vh - '+ navBar + 'rpx - 50rpx)'}" :scroll-with-animation="true"
			:enable-back-to-top="true">
			<view class="current text-df">
				<listCell title="当前门店" titleColor="#ff9700" :arrow="false" borderStyle="dashed" />
				<view class="currentShop text-lg">
					<text>{{currentShop}}</text>
					<view @click="location">
						<text class='cuIcon-locationfill text-orange margin-right-xs'></text>
						<text class="text-olive">重新定位</text>
					</view>
				</view>
			</view>
			<view class="footprint">
				<listCell title="历史足迹" titleColor="#8dc63f" :arrow="false" borderStyle="dashed">
					<view slot="decorateIconSlot">
						<text class="cuIcon-footprint text-blue text-lg margin-right-sm"></text>
					</view>
				</listCell>
				<view class="footprintShops text-lg">
					<block v-for="(item, index) in shops" :key="index">
						<view class="item padding-xs" @click="selectShop(item.value)" :data-id="item.value">
							<text class="text-grey text-center">{{item.name}}</text>
						</view>
					</block>
				</view>
			</view>
			<scroll-view scroll-x class="bg-white nav margin-top-xs">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index===TabCur?'text-orange cur':''"
						v-for="(item,index) in tabList" :key="index" @tap="tabSelect" :data-id="index">
						{{item}}
					</view>
				</view>
			</scroll-view>
			<!--
			<swiper :current="TabCur3" class="swiper" duration="300" :circular="true"
				indicator-color="rgba(255,255,255,0)" indicator-active-color="rgba(255,255,255,0)"
				@change="swiperChange3">
				<swiper-item v-for="(item,index) in tabList3" :key="index">
					<div class="bg-white padding margin text-center text-black">{{item.name}}</div>
				</swiper-item>
			</swiper>
			-->
			<view>
				<block v-for="(item,index) in list" :key="index">
					<view :class="'indexItem-' + item.name" :id="'indexes-' + item.name" :data-index="item.name">
						<view class="padding-xs">{{item.name}}</view>
						<view class="cu-list menu-avatar no-padding">
							<view class="cu-item" v-for="(items,sub) in 3" :key="sub">
								<view class="cu-avatar round lg">{{item.name}}</view>
								<view class="content">
									<view class="text-grey">{{item.name}}<text
											class="text-abc">{{list[sub].name}}</text>君
									</view>
									<view class="text-gray text-sm">
										有{{sub+2}}个主子需要伺候
									</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</scroll-view>
		<view class="indexBar" :style="[{height:'calc(100vh - ' + navBar + 'px - 50px)'}]">
			<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
				<view class="indexBar-item" v-for="(item,index) in list" :key="index" :id="index" @touchstart="getCur"
					@touchend="setCur">
					{{item.name}}
				</view>
			</view>
		</view>
		<!--选择显示-->
		<view v-show="!hidden" class="indexToast">
			{{listCur}}
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				currentShop: '旺客隆关口店',
				shops: [{
						name: '旺客隆国美绿洲店',
						value: 10034
					},
					{
						name: '嘉诚超市',
						value: 1733
					},
					{
						name: '旺客隆超市纳溪店',
						value: 1546
					},
				],

				tabList: [
					'区域',
					'拼音'
				],
				TabCur: 0,

				StatusBar: this.StatusBar,
				navBar: 60,
				hidden: true,
				listCurID: '',
				list: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'L', 'M', 'N', 'P', 'S', 'W', 'X', 'Y', 'Z'],
				listCur: '',
			};
		},
		onLoad() {
			let list = [{}];
			for (let i = 0; i < 26; i++) {
				list[i] = {};
				list[i].name = String.fromCharCode(65 + i);
			}
			this.list = list;
			this.listCur = this.list[0];
		},
		onReady() {
			let that = this;
			uni.createSelectorQuery().select('.indexBar-box').boundingClientRect(function(res) {
				that.boxTop = res.top
			}).exec();
			uni.createSelectorQuery().select('.indexes').boundingClientRect(function(res) {
				that.barTop = res.top
			}).exec()
		},
		methods: {
			//获取位置
			location() {
				uni.getLocation({
					type: 'gcj02', //gcj02//wgs84
					success: res => {
						this.$util.toast('当前位置的经度：' + res.longitude + '\n当前位置的纬度：' + res.latitude);
					},
					fail: res => {
						this.$util.toast("获取位置失败，请手动选择。");
					},
				});
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			selectShop(id) {
				console.log(id);
			},
			//获取文字信息
			getCur(e) {
				this.hidden = false;
				this.listCur = this.list[e.target.id].name;
			},
			setCur(e) {
				this.hidden = true;
				this.listCur = this.listCur
			},
			//滑动选择Item
			tMove(e) {
				let y = e.touches[0].clientY,
					offsettop = this.boxTop,
					that = this;
				//判断选择区域,只有在选择区才会生效
				if (y > offsettop) {
					let num = parseInt((y - offsettop) / 20);
					this.listCur = that.list[num].name
				};
			},

			//触发全部开始选择
			tStart() {
				this.hidden = false
			},

			//触发结束选择
			tEnd() {
				this.hidden = true;
				this.listCurID = this.listCur
			},
			indexSelect(e) {
				let that = this;
				let barHeight = this.barHeight;
				let list = this.list;
				let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
				for (let i = 0; i < list.length; i++) {
					if (scrollY < i + 1) {
						that.listCur = list[i].name;
						that.movableY = i * 20
						return false
					}
				}
			}
		}
	}
</script>

<style scoped lang='scss'>
	.store {
		width: 100vw;
		background-color: #F8F8F8;
	}

	.current {
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		padding: 16rpx;
		background-color: #FFF;
		margin: 0rpx 16rpx 8rpx 16rpx;

		.currentShop {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 20rpx 4rpx 20rpx;
		}
	}

	.footprint {
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		padding: 16rpx;
		background-color: #FFF;
		margin: 8rpx 16rpx 0rpx 16rpx;

		.footprintShops {
			display: flex;
			flex-wrap: nowrap;
			padding: 20rpx 2rpx 6rpx 2rpx;

			.item {
				flex: 0 0 33%;
				margin-right: calc(5rpx*3 /2);
				border-radius: 3px;
				border: 2rpx solid #9b9b9b;

				>text {
					display: inline-flex;
					line-height: 32rpx;
					vertical-align: middle;
				}
			}
		}
	}

	.indexes {
		position: relative;
		margin-top: 20rpx;
	}

	.indexBar {
		position: fixed;
		right: 0px;
		bottom: 0px;
		padding: 20upx 20upx 20upx 60upx;
		display: flex;
		align-items: center;
	}

	.indexBar .indexBar-box {
		width: 40upx;
		height: auto;
		background: #f8f8f8;
		display: flex;
		flex-direction: column;
		padding: 10rpx 0rpx;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
	}

	.indexBar-item {
		flex: 1;
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		color: #888;
	}

	movable-view.indexBar-item {
		width: 40upx;
		height: 40upx;
		z-index: 9;
		position: relative;
	}

	movable-view.indexBar-item::before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 10upx;
		height: 20upx;
		width: 4upx;
		background-color: #f37b1d;
	}

	.indexToast {
		position: fixed;
		top: 0;
		right: 80upx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		margin: auto;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 48upx;
	}
</style>
