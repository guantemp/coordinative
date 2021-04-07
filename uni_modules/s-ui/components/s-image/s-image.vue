<template>
  <image
    class="s-image"
    :class="customClass"
    :src="src"
    :mode="mode"
    :style="c_style"
    :lazy-load="lazyLoad"
    :fade-show="fadeShow"
    :webp="webp"
    :show-menu-by-longpress="showMenuByLongpress"
    @click="handleClick"
    @load="handleLoad"
    @error="handleError"
  />
</template>

<script>
import addUnit from '../../utils/addUnit';
import mergeStyle from '../../utils/mergeStyle';

export default {
  name: 's-image',
  props: {
    customClass: {
      type: [String, Object, Array],
      default: ''
    },
    src: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'aspectFill'
    },
    width: {
      type: [String, Number],
      default: ''
    },
    height: {
      type: [String, Number],
      default: ''
    },
    // 圆角
    borderRadius: {
      type: [String, Number],
      default: ''
    },
    // 自定义样式
    customStyle: {
      type: [String, Object],
      default: ''
    },
    lazyLoad: {
      type: Boolean,
      default: false
    },
    fadeShow: {
      type: Boolean,
      default: true
    },
    webp: {
      type: Boolean,
      default: false
    },
    showMenuByLongpress: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    c_style () {
      return mergeStyle({
        width: addUnit(this.width),
        height: addUnit(this.height),
        borderRadius: addUnit(this.borderRadius)
      }, this.customStyle);
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('click', e);
    },
    handleLoad (e) {
      this.$emit('load', e);
    },
    handleError (e) {
      this.$emit('error', e);
    }
  }
};
</script>
