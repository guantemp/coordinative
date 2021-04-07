<template>
  <div class="s-hairline" :class="customClass" :style="c_style">
    <div
      class="s-hairline-border s-hairline-border-left"
      v-if="showBorder('left')"
      :style="{color:$sTheme(leftBorderColor||borderColor)}"
    ></div>
    <div
      class="s-hairline-border s-hairline-border-right"
      v-if="showBorder('right')"
      :style="{color:$sTheme(rightBorderColor||borderColor)}"
    ></div>
    <div
      class="s-hairline-border s-hairline-border-top"
      v-if="showBorder('top')"
      :style="{color:$sTheme(topBorderColor||borderColor)}"
    ></div>
    <div
      class="s-hairline-border s-hairline-border-bottom"
      v-if="showBorder('bottom')"
      :style="{color:$sTheme(bottomBorderColor||borderColor)}"
    ></div>
    <slot></slot>
  </div>
</template>

<script>
import addUnit from '../../utils/addUnit';
import mergeStyle from '../../utils/mergeStyle';

export default {
  name: 's-hairline',
  props: {
    // class
    customClass: {
      type: [String, Object, Array],
      default: ''
    },
    // 样式
    customStyle: {
      type: [String, Object],
      default: ''
    },
    // 全部边框
    allBorder: {
      type: Boolean,
      default: false
    },
    // 左右边框
    xBorder: {
      type: Boolean,
      default: false
    },
    // 上下边框
    yBorder: {
      type: Boolean,
      default: false
    },
    // 边框颜色
    borderColor: {
      type: String,
      default: '{borderBase}'
    },
    // 边框颜色
    borderRadius: {
      type: String,
      default: ''
    },
    // 是否显示左边框
    leftBorder: {
      type: Boolean,
      default: false
    },
    // 是否显示右边框
    rightBorder: {
      type: Boolean,
      default: false
    },
    // 是否显示上边框
    topBorder: {
      type: Boolean,
      default: false
    },
    // 是否显示下边框
    bottomBorder: {
      type: Boolean,
      default: false
    },
    // 左边框颜色
    leftBorderColor: {
      type: String,
      default: ''
    },
    // 右边框颜色
    rightBorderColor: {
      type: String,
      default: ''
    },
    // 上边框颜色
    topBorderColor: {
      type: String,
      default: ''
    },
    // 下边框颜色
    bottomBorderColor: {
      type: String,
      default: ''
    }
  },
  computed: {
    c_style () {
      return mergeStyle({
        borderRadius: addUnit(this.borderRadius)
      }, this.customStyle);
    }
  },
  methods: {
    showBorder (direction) {
      if (this.allBorder) return true;
      if (this.xBorder && ['left', 'right'].includes(direction)) return true;
      if (this.yBorder && ['top', 'bottom'].includes(direction)) return true;
      if (this[direction + 'Border']) return true;
      return false;
    }
  }
};
</script>

<style lang="scss">
.s-hairline {
  position: relative;
  &-border {
    pointer-events: none;
    border-radius: inherit;
    &::before {
      content: "";
      position: absolute;
      left: -50%;
      right: -50%;
      top: -50%;
      bottom: -50%;
      transform: scale(0.5);
      border: 0 solid currentColor;
      border-radius: inherit;
      pointer-events: none;
      box-sizing: border-box;
    }
    &-left::before {
      border-left-width: 1px;
    }
    &-right::before {
      border-right-width: 1px;
    }
    &-top::before {
      border-top-width: 1px;
    }
    &-bottom::before {
      border-bottom-width: 1px;
    }
  }
}
</style>
