<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style lang="scss">
	/*导入colorUI */
	 @import "static/colorui/main.css";
	 @import "static/colorui/icon.css";
	// 导入阿里巴巴矢量图标库
	/*#ifdef MP*/
	@import 'static/iconfont/iconfont.css';
	/*#endif*/
	/*#ifndef MP*/
	@import url('https://at.alicdn.com/t/font_2371605_uk8ymeqixci.css');
	/*#endif*/
</style>


