<template>
  <div class="s-popup-view" :class="customClass" :style="'display:'+(isVisible?'block':'none')">
    <div class="s-popup" :class="[positionClass,effectClass]" :style="styleZindex+styleDuration">
      <div v-if="mask" class="s-popup-mask" @touchmove.stop.prevent @click="maskClose && hide()" :style="c_maskStyle"></div>
      <div class="s-popup-wrap" @touchmove.stop.prevent :style="c_wrapStyle">
        <div v-if="closeBtn" class="s-icon-cross s-popup-close-btn" :style="c_closeBtnStyle" @click="hide"></div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import getUid from '../../utils/getUid';
import addUnit from '../../utils/addUnit';
import mergeStyle from '../../utils/mergeStyle';
import getPropsFnByParents from '../../utils/getPropsFnByParents';

// 记录弹框的zIndex
const zIndexMap = new Map();
const getMaxPopupZindex = () => {
  return Math.max(200, ...zIndexMap.values());
};
export default {
  name: 's-popup',
  props: {
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
  },
  data () {
    return {
      styleZindex: '',
      isVisible: false,
      styleDuration: '',
      effectClass: ''
    };
  },
  computed: {
    positionClass () {
      return this.position ? 's-popup-position-' + this.position : '';
    },
    c_maskStyle () {
      return mergeStyle({
        backgroundColor: 'rgba(0, 0, 0, ' + this.maskOpacity + ')'
      }, this.maskStyle);
    },
    c_wrapStyle () {
      return mergeStyle({
        width: addUnit(this.width),
        height: addUnit(this.height),
        background: this.$sTheme(this.background),
        maxWidth: addUnit(this.maxWidth),
        maxHeight: addUnit(this.maxHeight),
        borderRadius: addUnit(this.borderRadius)
      }, this.wrapStyle);
    },
    c_closeBtnStyle () {
      return mergeStyle({
        color: this.$sTheme(this.closeBtnColor)
      }, this.closeBtnStyle);
    }
  },
  watch: {
    value () {
      this.updateVisible();
    }
  },
  created () {
    Object.assign(this, {
      popupId: 's-popup-id-' + getUid(),
      isMounted: false,
      visibleId: 0,
      visibleStatus: false,
      effectTimeoutId: 0,
      autoCloseTimeoutId: 0
    });
  },
  methods: {
    async show () {
      if (!this.visibleStatus) {
        const visibleId = ++this.visibleId;
        const flag = this.beforeShow ? (await getPropsFnByParents(this, this.beforeShow)(this) && visibleId === this.visibleId) : true;
        if (flag) {
          const effectDuration = this.effect ? this.effectDuration : 0;
          this.visibleStatus = true;
          this.$emit('input', true);
          let zIndex = this.zIndex;
          if (!(Number(zIndex) > 0)) {
            zIndex = getMaxPopupZindex() + 1;
            zIndexMap.set(this.popupId, zIndex);
          }
          this.styleZindex = `z-index:${zIndex};`;
          this.styleDuration = `animation-duration:${effectDuration}ms;`;
          this.isVisible = true;
          this.effectClass = 's-popup-effect-enter';
          clearTimeout(this.effectTimeoutId);
          this.effectTimeoutId = setTimeout(() => {
            this.styleDuration = '';
            this.effectClass = '';
            if (this.visibleStatus) {
              this.$emit('show');
              // 自动关闭
              const duration = parseInt(this.duration);
              if (duration > 0) {
                clearTimeout(this.autoCloseTimeoutId);
                this.autoCloseTimeoutId = setTimeout(() => {
                  this.visibleStatus && this.hide();
                }, duration);
              }
            }
          }, effectDuration);
        } else {
          this.$emit('input', false);
        }
      }
    },
    async hide () {
      if (this.visibleStatus) {
        const visibleId = ++this.visibleId;
        const flag = this.beforeHide ? (await getPropsFnByParents(this, this.beforeHide)(this) && visibleId === this.visibleId) : true;
        if (flag) {
          const effectDuration = this.effect ? this.effectDuration : 0;
          this.visibleStatus = false;
          this.$emit('input', false);
          this.styleDuration = 'animation-duration:' + effectDuration + 'ms;';
          this.effectClass = 's-popup-effect-leave';
          clearTimeout(this.autoCloseTimeoutId);
          clearTimeout(this.effectTimeoutId);
          this.effectTimeoutId = setTimeout(() => {
            this.isVisible = false;
            this.effectClass = '';
            this.styleZindex = '';
            this.styleDuration = '';
            zIndexMap.delete(this.popupId);
            if (!this.visibleStatus) {
              this.$emit('hide');
            }
          }, effectDuration);
        } else {
          this.$emit('input', true);
        }
      }
    },
    updateVisible () {
      if (this.isMounted && this.visibleStatus !== this.value) {
        this[this.value ? 'show' : 'hide']();
      }
    }
  },
  mounted () {
    this.isMounted = true;
    this.updateVisible();
  },
  beforeDestroy () {
    zIndexMap.delete(this.popupId);
    clearTimeout(this.effectTimeoutId);
    clearTimeout(this.autoCloseTimeoutId);
  }
};
</script>

<style lang="scss">
.s-popup {
  position: fixed;
  left: 0;
  right: 0;
  top: var(--window-top);
  bottom: var(--window-bottom);
  margin: 0;
  padding: 0;
  pointer-events: none;

  &-mask {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    pointer-events: auto;
  }

  &-wrap {
    position: absolute;
    max-height: 100%;
    pointer-events: auto;
  }

  &-close-btn {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 36rpx;
    padding: 24rpx 26rpx;
    z-index: 99;
  }

  // 动画效果
  animation-fill-mode: both;

  &-mask,
  &-wrap {
    animation-fill-mode: both;
    animation-duration: inherit;
  }

  &-effect-enter {
    .s-popup-mask,
    .s-popup-wrap {
      animation-name: s-animate-fade-enter;
    }
  }

  &-effect-leave {
    .s-popup-mask,
    .s-popup-wrap {
      animation-name: s-animate-fade-leave;
    }
  }
}

// center
.s-popup-position-center {
  display: flex;
  justify-content: center;
  align-items: center;

  .s-popup-wrap {
    position: relative;
  }

  &.s-popup-effect-enter {
    .s-popup-wrap {
      animation-name: s-animate-center-enter;
    }
  }

  &.s-popup-effect-leave {
    .s-popup-wrap {
      animation-name: s-animate-center-leave;
    }
  }
}

// top
.s-popup-position-top {
  .s-popup-wrap {
    top: 0;
    width: 100%;
  }

  &.s-popup-effect-enter {
    .s-popup-wrap {
      animation-name: s-animate-top-enter;
    }
  }

  &.s-popup-effect-leave {
    .s-popup-wrap {
      animation-name: s-animate-top-leave;
    }
  }
}

// bottom
.s-popup-position-bottom {
  .s-popup-wrap {
    bottom: 0;
    width: 100%;
  }

  &.s-popup-effect-enter {
    .s-popup-wrap {
      animation-name: s-animate-bottom-enter;
    }
  }

  &.s-popup-effect-leave {
    .s-popup-wrap {
      animation-name: s-animate-bottom-leave;
    }
  }
}

// left
.s-popup-position-left {
  .s-popup-wrap {
    left: 0;
    width: 60%;
    height: 100%;
  }

  &.s-popup-effect-enter {
    .s-popup-wrap {
      animation-name: s-animate-left-enter;
    }
  }

  &.s-popup-effect-leave {
    .s-popup-wrap {
      animation-name: s-animate-left-leave;
    }
  }
}

// right
.s-popup-position-right {
  .s-popup-wrap {
    right: 0;
    width: 60%;
    height: 100%;
  }

  &.s-popup-effect-enter {
    .s-popup-wrap {
      animation-name: s-animate-right-enter;
    }
  }

  &.s-popup-effect-leave {
    .s-popup-wrap {
      animation-name: s-animate-right-leave;
    }
  }
}
</style>
