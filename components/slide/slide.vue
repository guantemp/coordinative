<template>
	<view>
		<view class="slide" :class="afferentClass" v-for="(item,index) in items" :key="index">
			<view class="item" :style="{transform:item.isTouchMove?'translateX(0)':`translateX(${offset}rpx)`,
			                              marginLeft:`-${offset}rpx`}" @touchstart="touchstart" @touchmove="touchmove"
				:data-index="index">
				<view class="flex-sub" @tap.stop="click(item)">
					<slot v-bind:item="item"></slot>
				</view>
				<view class="btn" v-for="(btn,num) in btnArr" :key="num" @tap.stop="btnClick(btn.events,item)"
					:style="[btnStyle(num)]">
					<text class="text-df" :style="{color:btn.color}">{{btn.name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/*
	 * items要使用mounted并$nextTickVue.$nextTick(() => {}），可消除第一次移动动画显示
	 * @property String afferentClass,用于template下一些css3格式设计
	 * @property {Array} btnArr 按钮，格式为：[{name: 'xxx', background:'xxx',width:'xxx',color:'xxx',events:'xxx'}]
	 */
	export default {
		props: {
			afferentClass: {
				type: String,
				default: ''
			},
			items: {
				type: Array,
				default: []
			},
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
				offset: 0,
			}
		},
		mounted() {
			if (Array.isArray(this.btnArr)) {
				for (const btn of this.btnArr) {
					this.offset += btn.width;
				}
			}
			for (const v of this.items) {
				this.$set(v, 'isTouchMove', false)
			}
		},
		methods: {
			btnStyle(index) {
				let style = {};
				style.backgroundColor = this.btnArr[index].background;
				style.boxShadow = "2px 0 5px " + this.btnArr[index].background;
				style.width = this.btnArr[index].width + 'rpx';
				if (index === this.btnArr.length - 1) {
					style.borderTopRightRadius = this.radius + 'rpx';
					style.borderBottomRightRadius = this.radius + 'rpx';
				}
				return style;
			},
			//单击行
			click(item) {
				setTimeout(() => {
					this.$emit('click', item);
				}, 100)
			},
			//单击按钮
			btnClick(name, item) {
				this.$emit(name, item)
			},
			touchstart(event) {
				for (const v of this.items) {
					if (v.isTouchMove) {
						v.isTouchMove = false;
						break;
					}
				}
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
				let startX = that.startX;
				let startY = that.startY;
				let index = event.currentTarget.dataset.index;
				/*  #ifdef APP-PLUS||H5||MP  */
				var touchMoveX = event.changedTouches[0].clientX; //滑动变化坐标
				var touchMoveY = event.changedTouches[0].clientY; //滑动变化坐标
				/*  #endif  */
				/*  #ifdef APP-NVUE */
				var touchMoveX = event.changedTouches[0].screenX; //滑动变化坐标
				var touchMoveY = event.changedTouches[0].screenY; //滑动变化坐标
				/*  #endif  */
				//获取滑动角度
				let angle = that.angle({
					X: startX,
					Y: startY
				}, {
					X: touchMoveX,
					Y: touchMoveY
				});
				let i = 0;
				for (const v of that.items) {
					if (Math.abs(angle) > 60) return;
					if (i === index) {
						if (touchMoveX > startX) //右滑
							that.$set(v, 'isTouchMove', false);
						else //左滑
							that.$set(v, 'isTouchMove', true);
					}
					i += 1;
				}

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
		transition: transform .5s ease-out;
	}

	.btn {
		/*  #ifdef APP-PLUS||H5||MP  */
		display: flex;
		/*  #endif  */
		font-weight: bold;
		align-items: center;
		justify-content: center;
	}
</style>
