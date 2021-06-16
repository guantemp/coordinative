<template>
	<view class="item">
		<view class="cu-bar bg-white top">
			<view class="box">
				<view class="cu-bar search bg-white">
					<view class="search-form round">
						<text class="cuIcon-search"></text>
						<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text"
							placeholder="按条码品名拼音搜索商品" confirm-type="search"></input>
					</view>
					<view class="action">
						<button class="cu-btn bg-green shadow-blur round">搜索</button>
					</view>
				</view>
			</view>
		</view>
		<!--工作流-->
		<view class="work">
			<listCell decorateIcon="/static/user/attendance.png" title="工作流" />
			<view class="cu-list grid col-5 no-border grid_list">
				<view class="cu-item" v-for="(item, index) in attendanceList"
					@tap.stop="this.$util.navTo('/pages/public/not_implemented')">
					<view class="text-red">
						<image class="img" :src="item.icon" />
						<view class="cu-tag badge">
							<block>2</block>
						</view>
					</view>
					<text>{{ item.title }}</text>
				</view>
			</view>
		</view>
		<view class="margin-xs radius">
			<slide @edit="edit" @del="del" radius="5">
				<view class="flex bg-white align-center justify-center flex" @tap.stop="itemClick">
					<view class="basis-df">我是撒发射点撒飞洒测试1</view>
					<view>我是测撒发生胜多负少试11</view>
				</view>
			</slide>
		</view>
		<slide :btnArr="btnArr" radius="40" @del="del">
			<view style="height:180rpx" class="padding bg-white text-center">我是测试2</view>
		</slide>

		<view class="bg-white margin-xs wai">
			<view class="text1">
				<view class="flex flex-sub">
					<view class="margin-right-xl">我是撒发射点撒飞洒测试1</view>
					<view>我是测胜多负少试11</view>
				</view>
				<view class="btn" v-for="(btn,num) in btnArr"
					:style="{width:btn.width+'rpx',backgroundColor:btn.background,}">
					<text :style="{color:btn.color}">{{btn.name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnArr: [{
						name: '编辑',
						background: '#00aaff',
						width: 200,
						color: '#fff',
						events: 'edit'
					},
					{
						name: '删除',
						width: 100,
						background: '#ff5500',
						color: '#fff',
						events: 'del'
					}
				],
				attendanceList: [{
						icon: '/static/user/clock_in.png',
						url: '/pages/user/clock_in',
						title: '打卡',
						color: '#ff6b81'
					},
					{
						icon: '/static/user/work_overtime.png',
						url: '/pages/user/work_overtime',
						title: '加班',
						color: '#ff6b81'
					},
					{
						icon: '/static/user/leave.png',
						url: '/pages/user/leave',
						title: '请假',
						color: '#ff6b81'
					},
					{
						icon: '/static/user/apply_for_car.png',
						url: '/pages/warehouse/warehouse',
						title: '用车',
						color: '#ff6b81'
					},
					{
						icon: '/static/user/travel.png',
						url: '/pages/warehouse/warehouse',
						title: '出差',
						color: '#ff6b81'
					},
					{
						icon: '/static/user/repair.png',
						url: '/pages/warehouse/warehouse',
						title: '报修',
						color: '#ff6b81'
					},
					{
						icon: '/static/user/apply.png',
						url: '/pages/warehouse/warehouse',
						title: '申领',
						color: '#ff6b81'
					}, {
						icon: '/static/user/purchase.png',
						url: '/pages/warehouse/warehouse',
						title: '申购',
						color: '#ff6b81'
					},
					{
						icon: '/static/user/reimbursement.png',
						url: '/pages/user/go_out',
						title: '报销',
						color: '#ff6b81'
					},
				],
			}
		},
		methods: {
			//点击单行
			itemClick() {
				console.log('点击外面')
			},
			//删除
			del() {
				console.log('删除');
				uni.showToast({
					title: '删除ID--',
					icon: 'none'
				})
			},
			//编辑
			edit() {
				console.log('编辑')
				uni.showToast({
					title: '编辑ID--',
					icon: 'none'
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.wai{
		overflow: hidden;
	}
	.text1 {
		height: 120rpx;
		display: flex;
		justify-content: space-between;
		//transform: translateX(400rpx);
		margin-left: -400rpx;
	}

	.btn {
		/*  #ifdef APP-PLUS||H5||MP  */
		display: flex;
		/*  #endif  */
		font-weight: bold;
		align-items: center;
		justify-content: center;
	}

	.item {
		padding-top: 3vh;
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background-color: #F8F8F8;
	}

	.top {
		position: absolute;
		top: calc(var(--status-bar-height)+20rpx);
		z-index: 90;
		font-size: 32rpx;
		color: #606266;
	}

	.work {
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		padding: 20rpx 20rpx 0rpx 20rpx;
		background-color: #FFFFFF;
		margin: 120rpx 20rpx 0rpx 20rpx;

		.img {
			width: 48rpx;
			height: 48rpx;
		}

		.grid_list {
			padding: 20rpx 0rpx 0rpx 0rpx;
		}
	}
</style>
