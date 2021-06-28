<template>
	<view class="tree">
		<template v-for="(node,index) in list">
			<view class="flex padding-tb-xs bg-white align-center text-df" :class="isDividingLine?'solid-bottom':''"
				:style="{ paddingLeft: node.level*indent + 'rpx'}">
				<text @tap.stop="expandIconClick" class="icon-triangle-arrow padding-left-xs node-expand-icon" :class="[
						{ 
							'is-leaf': node.isLeaf,
							expanded: !node.isLeaf && node.expanded 
						}, 
					]">
				</text>
				<checkbox style="transform: scale(0.68);" :value="node.id" @click.stop="chooseTreeItem(node)">
				</checkbox>
				<text class="margin-left-xs">{{node.label}}</text>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		props: {
			trees: {
				type: Array,
				default: [],
				required: true,
			},
			indent: {
				type: Number,
				default: 36
			},
			selectedIds: {
				type: Array,
				default: []
			},
			expandedIds: {
				type: Array,
				default: []
			},
			disabledIds: {
				type: Array,
				default: []
			},
			hideIds: {
				type: Array,
				default: []
			},
			expendAll: {
				type: Boolean,
				default: false
			},
			isCheckOnlyLeaf: {
				type: Boolean,
				default: false
			},
			nodeCheckType: {
				type: String,
				default: '',
			},
			// 配置选项
			props: {
				type: Object,
				default: {
					sub: 'sub', // 指定子树为节点对象的某个属性值
					label: 'name', // 指定节点标签为节点对象的某个属性值
				}
			},
			flodedIcon: { //折叠
				type: String,
				default: 'data:image/png;base64,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'
			},
			expendedIcon: { //展开
				type: String,
				default: 'data:image/png;base64,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'
			},
			selectedIcon: { //选中图标
				type: String,
				default: '/static/pg-tree/icon/pg_selected.png'
			},
			isDividingLine: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				list: [],
				btnArr: [{
						name: '编辑',
						background: '#00aaff',
						width: 120,
						color: '#fff',
						events: 'edit'
					},
					{
						name: '删除',
						width: 120,
						background: '#ff5500',
						color: '#fff',
						events: 'del'
					}
				],
			}
		},
		mounted() {
			if (typeof this.props !== 'object') throw new Error('props must be of object type.');
			//console.log(this.getPropertyFromData(this.trees[0], 'label'));
			this.treesToList(this.props, this.trees);
			console.log(this.trees);
		},
		methods: {
			//将一个树型数组（tree)转换为列表(list)
			treesToList(props = {}, trees = [], level = 0, parentId = []) {
				for (const node of trees) {
					this.list.push({
						id: node.id,
						label: this.getPropertyFromData(node, 'label'),
						level,
						parentId, //父级id数组
						expended: this.expandedIds.includes(node.id) ? true : false,
					});
					let sub = this.getPropertyFromData(node, 'sub');
					if (Array.isArray(sub) && sub.length > 0) {
						let parentid = [...parentId];
						parentid.push(node.id);
						this.treesToList(this.props, sub, level + 1, parentid);
					} else {
						this.list[this.list.length - 1].isLeaf = true
					}
				}
			},
			chooseTreeItem(node) { //选择树
				if (node.isLeaf) {
					this.$emit('itemClick', node)
					if (this.selected.includes(node.id)) {
						this.selected.splice(this.selected.indexOf(node.id), 1)
					}
					this.selected.push(node.id)
				}
			},
			getPropertyFromData(node, prop) {
				const config = this.props[prop];
				console.log(typeof config)
				if (typeof config === 'function') {
					return config(node);
				} else if (typeof config === 'string') {
					return node[config];
				} else if (typeof config === 'undefined') {
					const dataProp = node[prop];
					return dataProp === undefined ? '' : dataProp;
				}
			},
		}
	}
</script>

<style lang='scss'>
	.tree {
		display: flex;
		flex-direction: column;
		transition: transform 0.4s;
		overflow: hidden;
	}

	.node-expand-icon {
		color: #C0C4CC;
		font-size: 28rpx;
		-webkit-transition: -webkit-transform .3s ease-in-out;
		transition: -webkit-transform .3s ease-in-out;
		transition: transform .3s ease-in-out;
		transition: transform .3s ease-in-out, -webkit-transform .3s ease-in-out
	}

	.node-expand-icon.expend {
		-webkit-transform: rotate(90deg);
		transform: rotate(90deg)
	}

	.node-expand-icon.is-leaf {
		color: transparent;
	}
</style>
