# s-popup

## 参数

``` js
{
  // class
  customClass: {
    type: [String, Object, Array],
    default: ''
  },
  // wrap背景
  background: {
    type: String,
    default: ''
  },
  // wrap宽度
  width: {
    type: [String, Number],
    default: ''
  },
  // wrap高度
  height: {
    type: [String, Number],
    default: ''
  },
  // wrap圆角
  borderRadius: {
    type: [String, Number],
    default: ''
  },
  // wrap最大宽度
  maxWidth: {
    type: [String, Number],
    default: ''
  },
  // wrap最大高度
  maxHeight: {
    type: [String, Number],
    default: ''
  },
  // wrap层样式
  wrapStyle: {
    type: [String, Object],
    default: ''
  },
  // z-index,如没指定，则在显示时使用比较自增
  zIndex: {
    type: [String, Number],
    default: 0
  },
  // v-model双向绑定
  value: Boolean,
  // 弹框显示位置 center | left | right | top | bottom
  position: {
    type: String,
    default: 'center'
  },
  // 是否使用过渡效果
  effect: {
    type: Boolean,
    default: true
  },
  // 过渡时间
  effectDuration: {
    type: Number,
    default: 300
  },
  // 是否显示遮罩
  mask: {
    type: Boolean,
    default: true
  },
  // 遮罩透明度
  maskOpacity: {
    type: Number,
    default: 0.7
  },
  // 遮罩样式
  maskStyle: {
    type: [String, Object],
    default: ''
  },
  // 点击遮罩是否关闭弹框
  maskClose: {
    type: Boolean,
    default: true
  },
  // 自动关闭时间
  duration: {
    type: Number,
    default: 0
  },
  // 是否显示关闭x
  closeBtn: {
    type: Boolean,
    default: false
  },
  // 关闭x颜色
  closeBtnColor: {
    type: String,
    default: '{textSecondary}'
  },
  // 关闭x的样式
  closeBtnStyle: {
    type: [String, Object],
    default: ''
  },
  // 显示时拦截钩子返回Boolean或Promise通过resolve(Boolean)拦截
  beforeShow: Function,
  // 隐藏时拦截钩子返回Boolean或Promise通过resolve(Boolean)拦截
  beforeHide: Function
}
```

## 事件

* @show 完全显示后触发
* @hide 完全关闭后触发

## 示例

#### template

``` html
<s-popup custom-class="demo-popup" v-model="visible">
  <!-- 内容 -->
</s-popup>
```

#### script

``` js
export default {
  data() {
    return {
      visible: true
    }
  }
}
```

#### style

``` css
.demo-popup {}
```
