<template>
	<view class="item">
		<view class="cu-bar bg-white top">
			<view class="box">
				<view class="cu-bar search bg-white">
					<view class="search-form round">
						<text class="cuIcon-search"></text>
						<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="按条码品名拼音搜索商品"
						 confirm-type="search"></input>
					</view>
					<view class="action">
						<button class="cu-btn bg-green shadow-blur round">搜索</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.item {
		padding-top: 3vh;
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}

	.top {
		position: absolute;
		top: calc(var(--status-bar-height)+20rpx);
		z-index: 90;
		font-size: 32rpx;
		color: #606266;
	}
</style>

