<template>
	<view class="navBar" :class="{navShadow:navShadow,}" :style="{opacity: opacityValue,background: navBarBackgroudColor,paddingTop: statusBarHeight,color:fontColor}">
		<view class="navBarContent" :style="{color:fontColor,}">
			<view class="btn">
				<text class="iconfont icon-left_arrow"></text>
			</view>
			<view class="title">
				<slot><text>{{title}}</text></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			opacity: {
				type: Number,
				default: 0.5
			},
			fontColor: {
				type: String,
				default: '#000'
			},
			showBack: {
				type: Boolean,
				default: true
			},
			showHome: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: '导航栏'
			},
			titleCenter: {
				type: Boolean,
				default: true
			},
			bgColor: {
				type: [String, Array],
				default: ['#FFF', '#FFF']
			},
		},
		data() {
			return {
				opacityValue: 1,
				navBarBackgroudColor: '#FFF',
				menuButtonBounding: {
					top: 0,
					height: 0,
				},
				statusBarHeight: 0,
				screenWidth: 0
			}
		},
		watch: {
			bgColor(val) {
				this.getNavBgColor(val);
			}
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
			this.getNavBgColor(this.bgColor);
			//获取胶囊尺寸
			this.menuButtonBounding = uni.getMenuButtonBoundingClientRect();
			//获取手机状态栏高度
			uni.getSystemInfo({
				success: res => {
					console.log(res);
					this.statusBarHeight = res.statusBarHeight + 'px';
					this.screenWidth = res.screenWidth;
				}
			})
		},
		methods: {
			getNavBgColor(val) {
				if (Array.isArray(val) && val.length >= 2) {
					let navBgColor = 'linear-gradient(45deg';
					val.forEach(item => {
						navBgColor += ',' + item;
					});
					navBgColor += ')';
					this.navBarBackgroudColor = navBgColor;
				} else {
					this.navBarBackgroudColor = val;
				}
				console.log(this.navBarBackgroudColor);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navBar {
		z-index: 1;
		display: flex;
		position: sticky;
		top: 0;
		width: 100vw;
	}

	.navBarContent {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		font-size: 32rpx;
		width: 100vw;
	}

	.btn {
		height: 44px;
		border-radius: 0 !important;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.title {
		font-weight: 700;
		height: 44px;
		line-height: 44px;
	}
</style>
