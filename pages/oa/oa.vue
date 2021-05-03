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

		<view class="grid col-3 bg-purple padding-tb-sm margin-lr-sm radius">
			<view class='cu-item padding-left-sm flex flex-direction'>
				<text class="cuIcon-vip" @click="showVip">区域fd参考售价</text>
				<text
					class="text-bold text-cyan text-price padding-tb-xs">{{item.vip.referencePurchasePrice||'--'}}</text>
			</view>
			<view class='cu-item padding-left-sm flex flex-direction'>
				<text class="cuIcon-vip" @click="showVip">区域参考进价</text>
				<text
					class="text-lg text-bold text-cyan text-price padding-tb-xs">{{item.vip.referencePurchasePrice||'--'}}</text>
			</view>
			<view class='cu-item padding-left-sm flex flex-direction'>
				<text>最近入库价</text>
				<text
					class="text-lg text-bold text-price padding-tb-xs text-yellow">{{item.storage.lastPurchasePrice||'--'}}</text>
			</view>
			<view class='cu-item padding-left-sm flex flex-direction'>
				<text class="padding-tb-xs">库存数量</text>
				<text class="text-lg text-bold text-pink">{{item.storage.number||'--'}}</text>
			</view>
			<view class='cu-item padding-left-sm flex flex-direction'>
				<text class="padding-tb-xs">库存金额</text>
				<text class="text-lg text-bold text-pink text-price">{{item.storage.amount||'--'}}</text>
			</view>
			<view class='cu-item padding-left-sm flex flex-direction'>
				<text class="padding-tb-xs cuIcon-question">存货周转率</text>
				<text class="text-lg text-bold text-green">{{item.storage.stockTurn||'--'}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
		}
	}
</script>

<style lang="scss" scoped>
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
