# s-picker

## 参数说明

``` js
{
  // class
  customClass: {
    type: [String, Object, Array],
    default: ''
  },
  // 背景
  background: {
    type: String,
    default: '#ffffff'
  },
  // 显示位置 center | left | right | top | bottom
  position: {
    type: String,
    default: 'bottom'
  },
  // z-index,如没指定，则在显示时使用比较自增
  zIndex: {
    type: [String, Number],
    default: 0
  },
  // 双向绑定picker显示隐藏
  visible: {
    type: Boolean,
    default: false
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
  // 点击遮罩是否关闭弹框
  maskClose: {
    type: Boolean,
    default: true
  },
  // 数据
  list: {
    type: Array,
    default () {
      return [];
    }
  },
  // item文本key
  labelName: {
    type: String,
    default: 'label'
  },
  // v-model双向绑定选中的下标数组
  value: {
    type: Array,
    default () {
      return [];
    }
  },
  title: {
    type: String,
    default: ''
  },
  titleColor: {
    type: String,
    default: '{textPrimary}'
  },
  // 取消按钮文字
  cancelText: {
    type: String,
    default: '取消'
  },
  // 取消按钮颜色
  cancelColor: {
    type: String,
    default: '{textSecondary}'
  },
  // 确认按钮文字
  confirmText: {
    type: String,
    default: '确定'
  },
  // 确认按钮颜色
  confirmColor: {
    type: String,
    default: '{primary}'
  }
}
```

## 事件

* change(index, selectedIndexList) 滑动改变时触发
* confirm() 点击确认后触发
