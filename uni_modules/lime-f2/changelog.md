## 0.4.6（2021-05-05）
- docs: nvue 使用文档更新 
## [代码示例：http://liangei.gitee.io/limeui/#/f2-example](http://liangei.gitee.io/limeui/#/f2-example)
## 0.4.5.7（2021-04-30）
- chore: nvue 增强 支持 console.log 输出到控制台方便调试
- docs: nvue 使用文档更新，不再需要声明F2
## 0.4.5.6（2021-04-29）
- fix: nvue 修复打包后 函数字符串被压缩无效的问题
- 若发现打包依然无效可使用直接返回字符串
```js 
this.$refs.chart.init(config => {
	return `
		const chart = new F2.Chart(config);
		chart.source(data);
		chart
			.interval()
			.position('genre*sold')
			.color('genre');
		chart.render();
		return chart;
	`
},{data});
```
- chore: 新增支持词云能力，头条小程序需要1.78.0后
## [代码示例：http://liangei.gitee.io/limeui/#/f2-example](http://liangei.gitee.io/limeui/#/f2-example)
## 0.4.5.5（2021-04-25）
- fix: 修复新版谷歌浏览器(90.0.4430.85) 报 `transform ` 的问题
## 0.4.5.4（2021-04-23）
- fix: 修复支付宝小程序尺寸问题
## [代码示例：http://liangei.gitee.io/limeui/#/f2-example](http://liangei.gitee.io/limeui/#/f2-example)
## 0.4.5.3（2021-04-22）
- chore:  删除多余console.log
## 0.4.5.2（2021-04-21）
- chore: 修复字节颜色报错的问题。
## 0.4.5.1（2021-04-18）
- chore: 增加默认尺寸 **300 x 300** , 当父级没有尺寸时启用。
- 由于 F2 **云图** 依赖的 `@antv/data-set` 只支持H5创建Canvas，所以暂时只有 H5 支持。
- 由于 F2 对绘制地图 不佳，故地图示例南海诸岛使用图片。
## [代码示例：http://liangei.gitee.io/limeui/#/f2-example](http://liangei.gitee.io/limeui/#/f2-example)
## 0.4.5（2021-04-16）
- fix: 修复 app-vue 字体固定问题
- fix: 修复 h5 app-vue 画多边形尺寸过大
- fix: 修复 初始化 func 问题
- docs: 增加 矩形式树图 示例
- 由于 F2 **云图** 依赖的 `@antv/data-set` 只支持H5创建Canvas，所以暂时只有 H5 支持。
## 0.4.4.1（2021-04-16）
- chore: 更改 `webview` 地址
## 0.4.4（2021-04-16）
- chore: `nvue` 增加 chart.$emit 事件，主要用于图表交互，接收动作事件数据。
```html
<l-f2 @change="onChange" />
```
```js
chart.tooltip({
	onChange: (ev) => {
		chart.$emit('change', ev)
	}
})
```
## [代码示例：http://liangei.gitee.io/limeui/#/f2-example](http://liangei.gitee.io/limeui/#/f2-example)
## 0.4.3.1（2021-04-14）
- docs: 更新官网上的代码示例！复制粘贴即用
## [代码示例 http://liangei.gitee.io/limeui/#/f2-example](http://liangei.gitee.io/limeui/#/f2-example)
## 0.4.3（2021-04-13）
- chore: 增加`onInit`的属性函数，直接向图表传递初始化函数
```html
<l-f2 :onInit="onInitChart" />
```
```js
export default {
	data: ()=>({
		onInitChart: config => {
			const chart = new F2.Chart(config);
			const data = [
				{ value: 63.4, city: 'New York', date: '2011-10-01' },
				{ value: 62.7, city: 'Alaska', date: '2011-10-01' },
				{ value: 72.2, city: 'Austin', date: '2011-10-01' },
				{ value: 58, city: 'New York', date: '2011-10-02' },
				{ value: 59.9, city: 'Alaska', date: '2011-10-02' },
				{ value: 67.7, city: 'Austin', date: '2011-10-02' },
				{ value: 53.3, city: 'New York', date: '2011-10-03' },
				{ value: 59.1, city: 'Alaska', date: '2011-10-03' },
				{ value: 69.4, city: 'Austin', date: '2011-10-03' },
			  ];
			  chart.source(data, {
				date: {
				  range: [0, 1],
				  type: 'timeCat',
				  mask: 'MM-DD'
				},
				value: {
				  max: 300,
				  tickCount: 4
				}
			  });
			  chart.area().position('date*value').color('city').adjust('stack');
			  chart.line().position('date*value').color('city').adjust('stack');
			  chart.render();
			  // 注意：需要把chart return 出来
			  return chart;
		}
	})
}
```
## 0.4.2（2021-04-09）
- chore: `nvue` webview 改为网络地址
## 0.4.1（2021-04-09）
- chore: `redraw(callback)` 更名为 `reset(callback)`
- fix: 修复 `nvue` 某些情况下无法传递函数字符串
- feat: 增加 `nvue` 下使用 `insertCss` 给节点设置 style
## 0.4.0（2021-04-08）
- chore: antv F2 version 更新到 `3.8.6`
- feat: `f2-all`,`f2-simple`等文件，默认只提供`f2.min.js`,如果需要`f2-all`或`f2-simple`可去码云下载按自已需要引入！
- fix: 修复钉钉小程序measureText undefined的问题
- fix: 修复小程序因`hammer`引用报错
## 0.3.0（2021-04-06）
- feat: `redraw(callback)` 方法重绘
- feat: `clear()` 方法清空图表
- feat: `changeData(data)` 方法更新图表，需要传数据
- feat: `repaint()` 方法更新图表：`source` 数据源 更新后，在需要的时候调用
- feat: `source` 数据源 和 `is-auto-play` 开启自动更新，配置这两个参数只要 `source` 数据源更新，就会更新图表
## 0.2.2（2021-04-05）
- fix: 修复微信小程序缺少`Transform`报错问题
## 0.2.1（2021-04-04）
- chore:  考虑到不是所有人需要 `nvue`，所以 `webview` 改为网络路径 , 当然你也可以把html下载放置到项目根目录的`hybrid`文件夹下
## 0.2.0（2021-04-04）
- chore:  基于 `webview` 实现兼容 `nvue`
## 0.1.0（2021-04-02）
- chore:  第一次上传，基本全端兼容，使用方法与官网一致。
