<template>
	<view>
		<navBar title="会员管理" :backgroundColor="[1, ['#24bdab', '#80c54c', 45]]"
			surplusHeight="88" tabPage="/pages/index/index" :titleFont="['#FFF','center']">
		</navBar>
	</view>
</template>

<script>
	import navBar from '@/components/navBar/navBar.vue';
	export default {
		components: {
			navBar
			//'HMfilterDropdown': HMfilterDropdown
		},
		data() {
			return {}
		},
	}
</script>

<style>
</style>
