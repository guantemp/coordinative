<template>
	<view class="slide">
		<view class="item" :style="[itemStyle]" :class="isTouchMove?'touch-move-active':''" @touchstart="touchstart"
			@touchmove="touchmove">
			<view class="flex-sub" @tap="itemClick">
				<slot :item="item"></slot>
			</view>
			<view v-for="(btn,index) in btnArr" :key="index" @touchstart="btnClick(btn.events)" class="btn"
				:style="{width:btn.width+'rpx',backgroundColor:btn.background}">
				<text class="text-df" :style="{color:btn.color}">{{btn.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			radius: {
				type: Number,
				default: 0
			},
			//按钮数组
			btnArr: {
				type: Array,
				default: [{
						name: '编辑',
						width: 200,
						background: '#00aaff',
						color: '#fff',
						events: 'edit'
					},
					{
						name: '删除',
						width: 200,
						background: '#ff5500',
						color: '#fff',
						events: 'del'
					},
				]
			},
		},
		data() {
			return {
				startX: 0, //开始坐标
				startY: 0, //开始Y坐标
				isTouchMove: false,
				buttons: [],
				offset: 0,
			}
		},
		created() {
			if (Array.isArray(this.btnArr)) {
				this.buttons = this.btnArr;
				for (const btn of this.buttons) {
					this.offset += btn.width;
				}
			}
		},
		computed: {
			itemStyle: function() {
				let style = {};
				style.marginLeft = `-${this.offset}rpx`;
				if (!this.isTouchMove) {
					style.transform = `translateX(${this.offset}rpx)`;
				}
				return style;
			},
		},
		methods: {
			btnStyle(index) {
				let style = {};
				style.backgroundColor = this.buttons[index].background;
				style.width = this.buttons[index].width + 'rpx';
				if (index === this.buttons.length - 1) {
					style.borderTopRightRadius = this.radius + 'rpx';
					style.borderBottomRightRadius = this.radius + 'rpx';
				}
				return style;
			},
			//点击单行
			itemClick() {
				setTimeout(() => {
					if (this.isTouchMove) {
						this.$emit('itemClick')
					}
				}, 100)
			},
			//点击按钮
			btnClick(name, event) {
				this.$emit(name)
			},
			touchstart(event) {
				/*  #ifdef APP-PLUS||H5||MP  */
				this.startX = event.changedTouches[0].clientX;
				this.startY = event.changedTouches[0].clientY;
				/*  #endif  */
				/*  #ifdef APP-NVUE */
				this.startX = event.changedTouches[0].screenX;
				this.startY = event.changedTouches[0].screenY;
				/*  #endif  */
			},
			//滑动事件处理
			touchmove(event) {
				let that = this;
				let startX = that.startX; //开始X坐标
				let startY = that.startY; //开始Y坐标
				/*  #ifdef APP-PLUS||H5||MP  */
				var touchMoveX = event.changedTouches[0].clientX //滑动变化坐标
				var touchMoveY = event.changedTouches[0].clientY //滑动变化坐标
				/*  #endif  */
				/*  #ifdef APP-NVUE */
				var touchMoveX = event.changedTouches[0].screenX //滑动变化坐标
				var touchMoveY = event.changedTouches[0].screenY //滑动变化坐标
				/*  #endif  */
				//获取滑动角度
				let angle = that.angle({
					X: startX,
					Y: startY
				}, {
					X: touchMoveX,
					Y: touchMoveY
				});
				if (Math.abs(angle) > 60) return;
				if (touchMoveX > startX) //右滑
					that.isTouchMove = false
				else //左滑
					that.isTouchMove = true
				//声明或者已经赋值过的对象或者数组（数组里边的值是对象）时，向对象中添加新的属性，如果更新此属性的值，是不会更新视图的,要使用set
				//that.$set(that.items[i], 'isTouchMove', false) set
			},
			angle: function(start, end) {
				var X = end.X - start.X,
					Y = end.Y - start.Y
				//返回角度 /Math.atan()返回数字的反正切值
				return 360 * Math.atan(Y / X) / (2 * Math.PI);
			},
		}
	}
</script>

<style lang="scss">
	.slide {
		overflow: hidden;
	}

	.item {
		/*  #ifdef APP-PLUS||H5||MP  */
		display: flex;
		/*  #endif  */
		justify-content: space-between;
		transition-property: transform;
		transition: 0.3s ease;
	}

	.btn {
		/*  #ifdef APP-PLUS||H5||MP  */
		display: flex;
		/*  #endif  */
		font-weight: bold;
		align-items: center;
		justify-content: center;
	}

	.touch-move-active .content {
		transform: translateX(0);
	}
</style>
