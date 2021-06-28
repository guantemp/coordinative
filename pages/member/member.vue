<template>
	<view class="bg-white">
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
		<scroll-view scroll-y="true">
			<hop-tree :trees="categories"></hop-tree>
		</scroll-view>
	</view>
</template>

<script>
	import catalog from '@/test/catalog_test_data.js'; //用例数据库
	export default {
		data() {
			return {
				categories: [],
				expandKeys: [234567],
				checkedKeys: [234567],
				defaultProps: {
					children: 'sub',
					label: 'name'
				},
			}
		},
		onLoad() {
			this.categories = catalog.category;
		},
		methods: {
			// 只有在"点击"修改的指定节点会触发(也就是说这个方法只会触发一次)，obj中包含当前选中
			handleCheck(obj) {
				// obj: {
				// 	checkedKeys: [9, 5], // 当前选中节点的id数组
				// 	checkedNodes: [{...}, {...}], // 当前选中节点数组
				// 	data: {...}, // 当前节点的数据
				// 	halfCheckedKeys: [1, 4, 2], // 半选中节点的id数组
				// 	halfCheckedNodes: [{...}, {...}, {...}], // 半选中节点的数组
				// 	node: Node {...} // 当前节点实例
				// }

				console.log('handleCheck', obj);
			},

			// 只要节点的选中或半选中状态改变就触发（包括设置默认选中，点击选中/取消选中），其相关的所有父子节点都会触发（也就是说选中一个节点时，触发多次，父子节点的选中状态只要被修改就会触发）
			handleCheckChange(obj) {
				// obj: {
				// 	checked: true, // 节点是否选中
				// 	checkedall: false, // 当前树的所有节点是否全选中
				// 	data: {...}, // 节点数据
				// 	indeterminate: false, // 是否半选中
				// 	node: Node {...} // 节点实例
				// }

				console.log('handleCheckChange', obj);
			}
		}
	}
</script>

<style lang='scss'>
</style>
