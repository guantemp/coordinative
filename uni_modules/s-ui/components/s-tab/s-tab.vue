<template>
  <div
    v-if="tabsInfo"
    :class="[
      tabsInfo.slotTab?'s-tab-nav':'s-tab-wrap',
      {'is-active':isActive},
      {'is-disabled':disabled}
    ]"
    :style="tabsInfo.slotTab?'color:'+$sTheme(disabled?tabsInfo.disabledColor:(isActive?tabsInfo.activeColor:tabsInfo.color)):''"
    @click="navClick"
  >
    <slot v-if="tabsInfo.slotTab"></slot>
    <div v-else class="s-tab-panel">
      <slot v-if="!tabsInfo.lazyRender||info.isRender"></slot>
    </div>
  </div>
</template>

<script>
import getParentUntil from '../../utils/getParentUntil';

export default {
  name: 's-tab',
  props: {
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
  },
  data () {
    return {
      info: {
        title: '',
        name: '',
        disabled: false,
        isRender: false
      }
    };
  },
  watch: {
    title: {
      immediate: true,
      handler () {
        this.info.title = this.title;
      }
    },
    name: {
      immediate: true,
      handler () {
        this.info.name = this.name;
      }
    },
    disabled: {
      immediate: true,
      handler () {
        this.info.disabled = this.disabled;
      }
    }
  },
  computed: {
    isActive () {
      return this.$tabs.navContextList.length && this.$tabs.navContextList[this.$tabs.current] == this;
    },
    tabsInfo () {
      return {
        slotTab: this.$tabs.slotTab,
        navWidth: this.$tabs.navWidth,
        color: this.$tabs.color,
        activeColor: this.$tabs.activeColor,
        disabledColor: this.$tabs.disabledColor,
        lazyRender: this.$tabs.lazyRender
      };
    }
  },
  methods: {
    navClick () {
      if (this.$tabs.slotTab) {
        this.$tabs.navContextList.some((item, index) => {
          if (item == this) {
            this.$tabs.navClick(index, item);
            return true;
          }
        });
      }
    }
  },
  created () {
    this.$tabs = getParentUntil(this, 's-tabs');
    this.$tabs.navInfoList = this.$tabs.navInfoList.concat(this.info);
    this.$tabs.navContextList = this.$tabs.navContextList.concat(this);
  },
  beforeDestroy () {
    this.$tabs.navInfoList = this.$tabs.navContextList.filter(item => item !== this.info);
    this.$tabs.navContextList = this.$tabs.navContextList.filter(item => item !== this);
  }
};
</script>

<style lang="scss">
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
.s-tab-wrap {
  width: 100%;
  height: 0;
  font-size: 28rpx;
  flex-shrink: 0;
  white-space: normal;
  overflow: hidden;
  box-sizing: border-box;

  &.is-active {
    height: auto;
    overflow: visible;
  }
}
</style>
