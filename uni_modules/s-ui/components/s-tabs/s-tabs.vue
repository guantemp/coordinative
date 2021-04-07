<template>
  <div class="s-tabs" :class="customClass">
    <div class="s-tabs-nav-wrap" :class="{'is-fixed':fixed}" :style="{height:c_height}">
      <scroll-view
        class="s-tabs-nav-scroll-view"
        :style="{height:c_height,background:$sTheme(background)}"
        :show-scrollbar="false"
        scroll-with-animation
        scroll-x
        :scroll-left="scrollLeft"
      >
        <div class="s-tabs-nav-container">
          <div class="s-tabs-nav-list">
            <template v-if="!slotTab">
              <div
                v-for="(item,index) of navInfoList"
                :class="['s-tab-nav',{'is-disabled':item.disabled},{'is-active':current==index}]"
                :style="'color:' + $sTheme(item.disabled?disabledColor:(current==index?activeColor:color))"
                :key="index"
                @click="navClick(index,item)"
              >{{item.title}}</div>
            </template>
            <slot v-else></slot>
          </div>
          <div v-if="bar" class="s-tabs-active-bar" :style="barStyle"></div>
        </div>
      </scroll-view>
    </div>
    <div v-if="!slotTab" class="s-tabs-content-wrap" :style="contentStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import getPropsFnByParents from '../../utils/getPropsFnByParents';
import addUnit from '../../utils/addUnit';
import mergeStyle from '../../utils/mergeStyle';

export default {
  name: 's-tabs',
  options: {
    styleIsolation: 'shared'
  },
  props: {
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
  },
  data () {
    return {
      name: 0,
      scrollLeft: 0,
      barLeft: 0,
      isShowBar: false,
      navInfoList: []
    };
  },
  computed: {
    c_height () {
      return addUnit(this.height);
    },
    // 是否是name匹配
    isNameMatch () {
      return this.navInfoList.every(item => item.name !== '');
    },
    // 当前选中标签的下标
    current () {
      if (this.isNameMatch) {
        return this.navInfoList.findIndex(item => item.name === this.name);
      } else {
        return this.name;
      }
    },
    // 底部条宽度px
    c_barWidth () {
      let barWidth = 0;
      if (this.navInfoList[this.current]) {
        barWidth = this.barWidth;
        if (/\d+px$/.test(barWidth)) {
          barWidth = parseInt(barWidth);
        } else {
          barWidth = uni.upx2px(parseInt(barWidth));
        }
      }
      return barWidth;
    },
    barStyle () {
      return mergeStyle({
        width: (this.isShowBar ? this.c_barWidth : 0) + 'px',
        height: addUnit(this.barHeight),
        background: this.$sTheme(this.barColor),
        borderRadius: addUnit(this.barBorderRadius),
        transition: `transform ${this.barDuration}ms`,
        transform: `translateX(${this.barLeft}px)`
      });
    },
    contentStyle () {
      return `
        transition: transform ${this.effect ? this.duration : 0}ms;
        transform: translate3d(${-100 * this.current}%, 0, 0);
      `;
    }
  },
  watch: {
    value (value) {
      this.name = value;
      !this.lockValue && this.refresh();
    },
    navInfoList () {
      this.$nextTick(this.refresh);
    }
  },
  methods: {
    query () {
      return uni.createSelectorQuery().in(this);
    },
    refresh () {
      this.renderContent();
      this.scrollByIndex();
    },
    async navClick (index, navItemInfo) {
      const name = this.isNameMatch ? navItemInfo.name : index;
      const title = navItemInfo.title;
      this.$emit('click', name, title);
      if (index !== this.current && !navItemInfo.disabled) {
        const changeId = ++this.changeId;
        const flag = this.beforeChange ? (await getPropsFnByParents(this, this.beforeChange)(name, title) && changeId === this.changeId) : true;
        if (flag) {
          this.name = name;
          this.lockValue = true;
          this.$emit('input', name);
          this.$emit('change', name, title);
          this.refresh();
          this.$nextTick(() => {
            this.lockValue = false;
          });
        }
      }
    },
    renderContent () {
      const item = this.navContextList[this.current];
      if (item && !item.info.isRender) {
        item.info.isRender = true;
        this.$emit('render', this.name, item.info.title);
      }
    },
    // 刷新滚动距离
    scrollByIndex () {
      if (!this.isMounted) return;
      this.query().selectAll('.s-tabs-nav-wrap,.s-tabs-nav-list').boundingClientRect().exec(([[wrapRect, viewRect]]) => {
        // 记录初始时view到wrap的左边距
        if (this.scrollLeft == 0) {
          this.diffLeft = viewRect.left - wrapRect.left;
        }
        const setNavScroll = (currentNavRect) => {
          if (currentNavRect) {
            const centerLeft = (wrapRect.width - currentNavRect.width) / 2;
            this.scrollLeft = Math.abs(viewRect.left - wrapRect.left - this.diffLeft) + currentNavRect.left - centerLeft - wrapRect.left;
            this.barLeft = this.scrollLeft + centerLeft + (currentNavRect.width - this.c_barWidth) / 2;
            if (!this.isShowBar) {
              setTimeout(() => {
                this.isShowBar = true;
              }, this.barDuration);
            }
          }
        };
        if (this.slotTab) {
          const currentNavContext = this.navContextList[this.current];
          if (currentNavContext) {
            uni.createSelectorQuery().in(currentNavContext).select('.s-tab-nav').boundingClientRect().exec(([item]) => {
              setNavScroll(item);
            });
          }
        } else {
          this.query().selectAll('.s-tab-nav').boundingClientRect().exec(([list]) => {
            setNavScroll(list[this.current]);
          });
        }
      });
    }
  },
  created () {
    Object.assign(this, {
      isMounted: false,
      changeId: 0,
      navContextList: [],
      diffLeft: 0,
      name: this.value,
      lockValue: false
    });
  },
  mounted () {
    this.$nextTick(() => {
      this.isMounted = true;
      this.refresh();
    });
  }
};
</script>

<style lang="scss">
.s-tabs {
  &-nav-wrap {
    &.is-fixed {
      .s-tabs-nav-scroll-view {
        width: 100%;
        white-space: nowrap;
        position: fixed;
        box-sizing: border-box;
        z-index: 9;
      }
    }
  }

  &-nav-scroll-view {
    ::-webkit-scrollbar {
      display: none;
    }
  }

  &-nav-container {
    position: relative;
    height: 100%;
  }

  &-nav-list {
    min-width: 100%;
    height: 100%;
    display: inline-flex;
    box-sizing: border-box;

    ::v-deep s-tab {
      height: 100%;
      flex: 1 0 0;
    }
  }
  .s-tab-nav {
    height: 100%;
    flex: 1 0 0;
    display: flex;
    font-size: 26rpx;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
  }
  &-active-bar {
    position: absolute;
    bottom: 0;
  }

  &-content-wrap {
    display: flex;
    white-space: nowrap;

    ::v-deep s-tab {
      width: 100%;
      flex-shrink: 0;
      box-sizing: border-box;
    }
  }
}
</style>
