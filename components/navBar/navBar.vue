<template>
	<view class="navBar">
		<view class="navBarContent"
			:style="{width:barWidth,height:barHeight,'background-color': navBarBackgroudColor,'background-image':navBarBackgroudColor,navShadow:navShadow}">
			<view class="backImg" v-if="navBarBackgroudImg" :style="{'opacity': 1}">
				<image :style="{height:barHeight,width:barWidth}" :src="navBarBackgroudImg" mode="scaleToFill"></image>
			</view>
			<view class="capsuleontent"
				:style="{maxWidth: barCapsuleContentMaxWidth,paddingTop:menuButtonBounding.top + 'px','line-height':menuButtonBounding.height + 'px'}">
				<view class="btn">
					<slot name="btnSlot">
						<view v-if="btnType==='back' && !firstPage" @click="navBack">
							<text class="iconfont icon-left_arrow" :style="{color:fontColor}"></text>
						</view>
						<view v-else-if="btnType==='home'" @click="navHome">
							<text class="iconfont icon-home" :style="{color:fontColor,}"></text>
						</view>
						<view v-else-if="btnType==='tower'" class="tower"
							:style="{width:menuButtonBounding.width+'px','line-height':menuButtonBounding.height-2 + 'px'}">
							<text class="iconfont icon-left_arrow" :style="{color:fontColor,}" @click="navBack"></text>
							<text v-if="!firstPage" class="iconfont icon-home" :style="{color:fontColor,}"
								@click="navHome"></text>
						</view>
					</slot>
				</view>
				<view class="surplus">
					<slot name="surplusSlot">
						<view v-if="title" :style="{color:fontColor,}" class="title">
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
	</view>
</template>

<script>
	export default {
		props: {
			surplusHeight: {
				type: Number,
				default: 0
			},
			backgroundColor: {
				type: Array,
				//背景色,参数一：透明度,参数二：背景颜色（array则为线性渐变，string为单色背景）渐变轴角度
				// 比如：[1,['#24bdab','#80c54c'，45]]
				default: []
			},
			backgroundImg: {
				type: String,
				// 背景图片
				default: ''
			},
			btnType: {
				type: String,
				default: 'back'
			},
			tabPage: {
				type: String,
				default: ''
			},
			fontColor: {
				type: String,
				default: '#000'
			},
			title: {
				type: String,
				default: '导航栏'
			},
			titleCenter: {
				type: Boolean,
				default: true
			},
		},
		data() {
			return {
				statusBarHeight: 0,
				barWidth: 0,
				barHeight: 0,
				barCapsuleContentMaxWidth: 0,

				navBarBackgroudColor: '#FFF',
				navBarBackgroudImg: null,
				menuButtonBounding: {
					top: 0,
					height: 0,
				},

				firstPage: false,

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
			//计算导航栏宽度，高度
			uni.getSystemInfo({
				success: res => {
					this.statusBarHeight = res.statusBarHeight + 'px';
					this.barWidth = res.screenWidth + 'px';
					this.barHeight = res.statusBarHeight + this.menuButtonBounding.height + (this
						.menuButtonBounding.top - res.statusBarHeight) * 2 + this.surplusHeight + 'px';
					// #ifdef MP-WEIXIN || MP-QQ || MP-BAIDU || MP-TOUTIAO
					this.barCapsuleContentMaxWidth = res.screenWidth - this.menuButtonBounding.width - (res
						.screenWidth - this.menuButtonBounding.right) + 'px';
					// #endif
				}
			});
			this.navBarBackgroudImg = this.backgroundImg;
			if (this.navBarBackgroudImg) {
				this.isWhite = true;
			} else {
				this.setNavBarColor(this.backgroundColor);
			}
			//获取所有页面
			let currentPages = getCurrentPages();
			let pageLen = currentPages.length;
			//判断是否是第一个页面，如果是有设置back为true的页面，将不显示返回箭头
			if (pageLen == 1)
				this.firstPage = true;
			console.log(this.menuButtonBounding.height);
		},
		methods: {
			navBack() {
				uni.navigateBack();
			},
			//返回首页
			navHome() {
				uni.switchTab({
					url: this.tabPage
				});
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
						this.isWhite = true;
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
		display: flex;
		top: 0;
		left: 0;
		overflow: hidden;
		//box-shadow: 0 0 6rpx 0 #ddd;
	}

	.navBarContent {
		display: flex;
		flex-direction: column;

		.backImg {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			z-index: 1;
		}

		.capsuleontent {
			display: flex;
			z-index: 2;
			padding-left: 13rpx;
			padding-right: 13rpx;

			.btn {
				padding-right: 13rpx;

				.tower {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 28rpx;
					border-radius: 33px;
					border-style: solid;
					border-width: 2rpx;
					border-color: rgba(0, 0, 0, 0.1);
					background-color: rgba(255, 255, 255, 0.65);
					/* #ifndef APP-PLUS-NVUE */
					box-sizing: border-box;
					/* #endif */
					//transition: color,background 0.2s !important;
				}
			}

			.surplus {
				width:100%;
				.title {
					font-size: 32rpx;
					display: block;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					text-align: center;
				}
			}
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
