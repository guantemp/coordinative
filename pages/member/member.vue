<template>
	<view class="content">
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				serverData: {
					title: '报道新生',
					ArrC: [{
							title: '船舶专业群',
							child: [{
								title: '船舶2001班'
							}]
						},
						{
							title: '船舶专业群',
							child: [{
									title: '船舶2001班'
								},{
									title: '船舶2001班'
								}
							]
						}
					]
				}
			}
		},
		onLoad() {
		},
		methods: {
			change(res){
				console.log(res)
			}
		}
	}
</script>