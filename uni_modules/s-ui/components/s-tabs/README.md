## [s-ui 代码](https://gitee.com/sldt/s-ui)

## [s-ui 演示](https://sldt.gitee.io/s-ui)

# s-tabs

## s-tabs组件参数说明

``` js
{
  // class
  customClass: {
    type: String,
    default: ''
  },
  // 导航高度 rpx
  height: {
    type: [Number, String],
    default: 80
  },
  // 是否固定导航
  fixed: {
    type: Boolean,
    default: false
  },
  // v-model双向绑定
  value: {
    type: [Number, String],
    default: 0
  },
  // 使子组件s-tab的slot成为导航的填充内容
  slotTab: {
    type: Boolean,
    default: false
  },
  // 导航背景色
  background: {
    type: String,
    default: 'transparent'
  },
  // 导航颜色
  color: {
    type: String,
    default: '{textPrimary}'
  },
  // 导航选中颜色
  activeColor: {
    type: String,
    default: '{primary}'
  },
  // 导航禁用颜色
  disabledColor: {
    type: String,
    default: '{textPlaceholder}'
  },
  // 内容部分是否动画切换
  effect: {
    type: Boolean,
    default: false
  },
  // 内容部分切换动画持续时间
  duration: {
    type: Number,
    default: 300
  },
  // 内容部分是否开启延迟渲染（首次切换到标签时才触发内容渲染）
  lazyRender: {
    type: Boolean,
    default: true
  },
  // 是否显示底部条
  bar: {
    type: Boolean,
    default: true
  },
  // 底部条颜色
  barColor: {
    type: String,
    default: '{primary}'
  },
  // 底部条切换动画持续时间
  barDuration: {
    type: [Number, String],
    default: 300
  },
  // 底部条宽度
  barWidth: {
    type: [Number, String],
    default: 50
  },
  // 底部条高度
  barHeight: {
    type: [Number, String],
    default: 4
  },
  // 底部条圆角
  barBorderRadius: {
    type: [Number, String],
    default: 4
  },
  // 切换标签前的拦截函数，返回Boolean或异步Promise通过resolve(Boolean) 可阻止切换
  beforeChange: Function
}
```

## s-tab子组件参数说明

``` js
{
  // 标题
  title: {
    type: String,
    default: ''
  },
  // 是否禁用导航
  disabled: {
    type: Boolean,
    default: false
  },
  // 匹配的标识符
  name: {
    type: [Number, String],
    default: ''
  }
}
```

## 事件

* @click(name, title) 点击
* @change(name, title) 内部导航切换时
* @render(name, title) 当lazy-render 为true时, 首次渲染内容时触发

## 使用方式

#### template

``` html
<section class="Tabs-Page">
  <div class="article">
    <p class="title">普通</p>
    <s-tabs effect @change="change" @render="render">
      <s-tab v-for="i of 5" :title="'Tab'+(i+1)" :key="i">内容{{i+1}}</s-tab>
    </s-tabs>
  </div>

  <div class="article">
    <p class="title">超出可滚动</p>
    <s-tabs effect @change="change" @render="render">
      <s-tab v-for="i of 15" :title="'Tab'+(i+1)" :key="i">内容{{i+1}}</s-tab>
    </s-tabs>
  </div>

  <div class="article">
    <p class="title">自定义导航间距样式</p>
    <s-tabs class="custom-tabs">
      <s-tab title="Tab1">1</s-tab>
      <s-tab title="Tab2">2</s-tab>
    </s-tabs>
  </div>

  <div class="article">
    <p class="title">slot-tab为true时</p>
    <p class="desc">s-tab下的内容将成为导航的内容填充，面板区域需要自己写，可配合swiper实现滑动效果</p>
    <s-tabs slot-tab v-model="activeTab">
      <s-tab v-for="item of tabList" :key="item">Tab{{item}}</s-tab>
    </s-tabs>
  </div>
</section>
```

#### script

``` js
export default {
  data() {
    return {
      tabList: [1, 2, 3, 4, 5, 6, 7],
      activeTab: 3
    };
  },
  methods: {
    change(name, title) {
      console.log('change:', name, title);
    },
    render(name, title) {
      console.log('render:', name, title);
    }
  },
  onLoad() {}
};
```

#### style

``` css
.Tabs-Page {
  .article {
    .title {
      padding: 20rpx;
      font-size: 30rpx;
      text-align: center;
    }

    .desc {
      padding: 0 30rpx;
      font-size: 26rpx;
    }
  }

  ::v-deep .s-tabs {
    .s-tab-nav {
      padding: 0 20rpx;
    }

    .s-tab-panel {
      padding: 30rpx 40rpx;
    }
  }

  .custom-tabs {
    ::v-deep .s-tabs-nav-list {
      display: flex;
      justify-content: center;

      .s-tab-nav {
        flex: 0 0 auto;
      }
    }
  }
}
```
