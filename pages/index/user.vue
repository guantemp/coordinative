<template>
	<view class="user">
		<!--info-->
		<view class="user_info">
			<image class="top-bg" src="/static/user/user-bg.png"></image>
			<view class="user_portrait" @click="this.$util.navTo(hasLogin?'/pages/user/userInfo':'/pages/user/login')">
				<image class="user_portrait_img" :src="userInfo.avatarUrl || '/static/user/face.png'"></image>
				<view class="user_portrait_hasLogin" v-if="hasLogin">
					<text
						class="user_portrait_hasLogin_text">{{ userInfo.nickName || userInfo.username || '无名' }}</text>
					<text class="user_portrait_hasLogin_bonus">积分：{{bonus}}</text>
				</view>
				<view class="user_portrait_noLogin_text" v-else>
					<text>登录</text>
				</view>
			</view>
		</view>
		<view class="arc">
			<image class="arc-img" src="/static/user/arc.png"></image>
		</view>
		<!--工资条-->
		<view class="pay">
			<listCell decorateIcon="/static/user/pay.png" title="我的工资"
				@eventClick="this.$util.navTo(hasLogin?'':'/pages/user/login')" />
		</view>

		<!--个人服务-->
		<view class="service">
			<listCell decorateIcon="/static/user/service.png" title="我的服务" arrow='true'/>
			<view class="cu-list grid col-3 no-border">
				<view class="cu-item " @tap.stop="this.$util.navTo('/pages/public/not_implemented')">
					<view class="text-red">
						<image class="grid_img" src="/static/user/notice.png" />
						<view class="cu-tag badge">
							<block>2</block>
						</view>
					</view>
					<text>公告</text>
				</view>
				<view class="cu-item" @tap.stop="this.$util.navTo('/pages/public/not_implemented')">
					<view class="text-red">
						<image class="grid_img" src="/static/user/task.png" />
						<view class="cu-tag badge">
							<block>4</block>
						</view>
					</view>
					<text>任务中心</text>
				</view>
				<view class="cu-item" @tap.stop="this.$util.navTo('/pages/public/not_implemented')">
					<view class="text-red">
						<image class="grid_img" src="/static/user/telecast.png" />
					</view>
					<text>直播</text>
				</view>
				<view class="cu-item" @tap.stop="this.$util.navTo('/pages/public/not_implemented')">
					<view class="text-red">
						<image class="grid_img" src="/static/user/shopping.png" />
					</view>
					<text>商城</text>
				</view>
				<view class="cu-item" @tap.stop="this.$util.navTo('/pages/public/not_implemented')">
					<view class="text-red">
						<image class="grid_img" src="/static/user/share.png" />
					</view>
					<text>分享</text>
				</view>
				<view class="cu-item" @tap.stop="this.$util.navTo('/pages/public/not_implemented')">
					<view class="text-red">
						<image class="grid_img" src="/static/user/set.png" />
					</view>
					<text>设置</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				bonus: 9999,
			};
		},
		computed: {
			...mapState(['userInfo']),
			...mapGetters(['hasLogin']),
		},
		onShow() {
			this.$store.dispatch('getUserInfo');
			//console.log(this.$store.state.userInfo);
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.user {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background-color: #F8F8F8;
	}

	.user_info {
		position: relative;
		width: 750rpx;
		height: 350rpx;
		padding: 120rpx 0rpx 0rpx 20rpx;
		background: #6739b6; //linear-gradient(45deg, #ec008c, #6739b6);

		.top-bg {
			position: absolute;
			left: 0;
			top: 0rpx;
			min-width: 100vw;
			min-height: 100vh;
			filter: blur(1px);
			opacity: .7;
		}

		.user_portrait {
			display: flex;
			align-items: center;
			margin-left: 20rpx;
			margin-top: 10rpx;
			color: #FFF;
		}

		.user_portrait_img {
			margin-right: 20rpx;
			width: 128rpx;
			height: 128rpx;
			border-radius: 50%;
		}

		.user_portrait_hasLogin {
			display: flex;
			flex-direction: column;
			font-size: 36rpx;
			font-weight: bold;
		}

		.user_portrait_hasLogin_text {
			font-size: 32rpx;
			font-weight: bold;
		}

		.user_portrait_hasLogin_bonus {
			padding: 10rpx 14rpx;
			margin-top: 10rpx;
			font-size: 20rpx;
			text-align: center;
			background-color: rgba(255, 255, 255, .3);
			border-radius: 40rpx;
		}

		.user_portrait_noLogin_text {
			font-size: 36rpx;
		}
	}

	.arc {
		height: 8rpx;

		.arc-img {
			top: -34upx;
			width: 100vh;
			height: 36upx;
		}
	}

	.pay {
		display: flex;
		flex-direction: column;
		height: 320rpx;
		border-radius: 20rpx;
		margin: 0rpx 20rpx;
		padding: 20rpx;
		background-color: #FFFFFF;

		.img {
			width: 48rpx;
			height: 48rpx;
		}
	}

	.service {
		display: flex;
		flex-direction: column;
		height: 460rpx;
		border-radius: 20rpx;
		padding: 20rpx 20rpx 0rpx 20rpx;
		background-color: #FFFFFF;
		margin: 20rpx 20rpx 0rpx 20rpx;
		;

		.grid_img {
			width: 80rpx;
			height: 80rpx;
		}

		.grid-text {
			font-size: 28rpx;
			margin-top: 4rpx;
		}
	}
</style>
