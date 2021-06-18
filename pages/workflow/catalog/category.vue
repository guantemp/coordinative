<template>
	<view>
		<navBar title="商品类目" :backgroundColor="[1, ['#6B73FF', '#000DFF', 135]]" :titleFont="['#FFF']" surplusHeight=43>
			<view slot="extendSlot" class="cu-bar search">
				<view class="search-form radius">
					<text class="cuIcon-search"></text>
					<input v-model="scanResult" :adjust-position="false" type="text" placeholder="请输入类目名称、拼音助记码"
						confirm-type="search"></input>
					<text class="cuIcon-scan text-blue text-bold" @tap="scan"></text>
				</view>
				<view class="action text-white">
					<text class="cuIcon-close "></text>
					<text @click="computedScrollViewHeight">取消</text>
				</view>
			</view>
		</navBar>
	</view>
</template>

<script>
</script>

<style>
</style>
