<template>
	<view class="navBar" :class="{navShadow:navShadow,width:barWidth}">
		<view class="navBarContent"
			:style="{height:barHeight,paddingTop: statusBarHeight,'background-color': navBarBackgroudColor,'background-image':navBarBackgroudColor}">
			<view class="backImg" v-if="navBarBackgroudImg">
				<image class="img" :style="{height:barHeight,width:barWidth}" src="background" mode="scaleToFill"></image>
			</view>
			<view class="searchBtn">
				<slot name="btnSlot">
					<view v-if="btnType==none"></view>
					<view v-if="btnType=='back'" @click="navBack">
						<text class="iconfont icon-left_arrow"></text>
					</view>
				</slot>
			</view>
			<view class="surplus">
				<slot name="surplusSlot">
					<view v-if="false" :style="{color:fontColor,}" class="title">
						<text>{{title}}</text>
					</view>
					<view v-else>
						<view class="cu-bar search">
							<view class="search-form round">
								<text class="cuIcon-search"></text>
								<input type="text" :placeholder=placeholder confirm-type="search"></input>
							</view>
							<view class="action">
								<button class="cu-btn bg-gradual-green shadow-blur round">搜索</button>
							</view>
						</view>
					</view>
				</slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			fontColor: {
				type: String,
				default: '#000'
			},
			btnType: {
				type: String,
				default: 'back'
			},
			title: {
				type: String,
				default: '导航栏'
			},
			titleCenter: {
				type: Boolean,
				default: true
			},
			backgroundColor: {
				type: Array,
				//背景色,参数一：透明度,参数二：背景颜色（array则为线性渐变，string为单色背景）渐变轴角度
				// 比如：[1,['#24bdab','#80c54c'，45]]
				default: []
			},
			backgroundImg: {
				type: [String, Array],
				// 背景图片（array则为滑动切换背景图，string为单一背景图）
				// 普通背景
				// ['/static/xj.jpg']
				// 切换功能参数说明：第一张图片，第二张图，第一张图透明度，第二张图透明度
				// ['/static/xj.jpg','/static/xk.jpg',1,1]
				default: null
			},
		},
		data() {
			return {
				screenWidth: 0,
				statusBarHeight: 0,
				barWidth: 0,
				barHeight: 0,
				clearHeight: 44,

				navBarBackgroudColor: '#FFF',
				navBarBackgroudImg: null,
				menuButtonBounding: {
					top: 0,
					height: 0,
				},


				surplusTitleOrSearch: true,
			}
		},
		watch: {

		},
		computed: {
			//导航底部线是否显示
			navShadow() {
				if (this.bgColor && typeof(this.bgColor) == "string") {
					return this.shadow && this.type !== 'transparent' && whiteList.includes(this.bgColor);
				} else {
					return false;
				}
			},
		},
		created() {
			//获取胶囊尺寸
			// #ifdef MP-WEIXIN || MP-QQ || MP-BAIDU || MP-TOUTIAO
			this.menuButtonBounding = uni.getMenuButtonBoundingClientRect();
			// #endif
			//获取屏幕宽度，状态栏高度
			uni.getSystemInfo({
				success: res => {
					this.statusBarHeight = res.statusBarHeight + 'px';
					this.barHeight = res.statusBarHeight + this.clearHeight + 'px';
					this.barWidth = res.screenWidth + 'px';
				}
			});
			this.setNavBarColor(this.backgroundColor);
			//console.log(this.backgroundColor);
		},
		methods: {
			navBack() {
				uni.navigateBack();
			},
			setNavBarColor(backColor) {
				if (Array.isArray(backColor) && backColor.length >= 2) {
					let transparent = backColor[0];
					let background = backColor[1];
					if (Array.isArray(background) && background.length >= 2) {
						let navBgColor = 'linear-gradient(';
						if (background.length == 3) //['#0081ff', '#1cbbb4',0]
							navBgColor += background[2] + 'deg,';
						else //['#0081ff', '#1cbbb4']
							navBgColor += '45deg,';
						let o = this.colorRgb(background[0]);
						navBgColor += `rgba(${o[0]}, ${o[1]}, ${o[2]}, ${transparent})` + ',';
						o = this.colorRgb(background[1]);
						navBgColor += `rgba(${o[0]}, ${o[1]}, ${o[2]}, ${transparent})` + ')';
						this.navBarBackgroudColor = navBgColor;
					} else { //[1,#FFFFF]
						let o = this.colorRgb(background);
						this.navBarBackgroudColor = `rgba(${o[0]}, ${o[1]}, ${o[2]}, ${transparent})`
					}
				} else { //#FFF
					this.navBarBackgroudColor = backColor;
				}
			},
			// 转换函数
			colorRgb(sColor) {
				var that = this;
				var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
				var sColor = sColor.toLowerCase();
				if (sColor && reg.test(sColor)) {
					if (sColor.length === 4) {
						var sColorNew = "#";
						for (var i = 1; i < 4; i += 1) {
							sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
						}
						sColor = sColorNew;
					}
					//处理六位的颜色值
					var sColorChange = [];
					for (var i = 1; i < 7; i += 2) {
						sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
					}
					return sColorChange;
				} else {
					return sColor;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.navBar {
		z-index: 1;
		display: flex;
		position: sticky;
		top: 0;
		box-shadow: 0 0 6rpx 0 #ddd;
	}

	.navBarContent {
		display: flex;
		align-content: center;
		font-size: 32rpx;
		width: 100%;
	}
	.backImg{
		position: relative;
		flex: 1;
		z-index:1;
		width: 100%;
		flex-direction: column;
		
		.img {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			z-index: 2;
		}
	}

	.titleBtn {
		border-radius: 0 !important;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.surplus {

		.title {
			font-weight: 700;
			line-height: 44px;
		}
	}

	.searchBtn {
		border-radius: 0 !important;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 8rpx;
	}
</style>
