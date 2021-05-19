<template>
	<movable-area class="area" @click.stop.prevent="click">
		<movable-view damping="40" direction="all" :x="position.x" :y="position.y" :animation="false"
			:style="{width:size+'rpx',height:size+'rpx'}" class="view" @touchmove.stop.prevent="touchmove"
			@touchend="touchend">
			<slot></slot>
		</movable-view>
	</movable-area>
</template>

<script>
	export default {
		data() {
			return {
				position: {
					x: 0,
					y: 0
				}
			}
		},
		props: {
			size: {
				type: Number,
				default: 90
			},
			bgColor: {
				type: String,
				default: ''
			}
		},
		mounted() {
			let sys = uni.getSystemInfoSync();
			let query = uni.createSelectorQuery().in(this);
			query.select('.view').boundingClientRect(res => {
				this.position = {
					x: sys.windowWidth - res.width - 20,
					y: sys.windowHeight - res.height - 20
				};
				//console.log(this.position)
			}).exec();
		},
		methods: {
			click() {
				this.$emit('btnClick');
			},
			touchmove(event) {
				if (event.touches.length !== 1) {
					return false;
				}
				//console.log("x: " + event.touches[0].clientX);
				//console.log("y: " + event.touches[0].clientY)
			},
			touchend(event) {}
		}
	}
</script>

<style lang="scss" scoped>
	.area {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		position: relative;
	}

	.view {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 100%;
		z-index: 99;
		background-color: rgba(0, 0, 0, 0.3);
		box-shadow: 0 0 6rpx rgba(0, 0, 0, 0.2);
	}
</style>
