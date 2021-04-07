<template>
  <div class="s-empty" :class="customClass" :style="c_style">
    <div class="s-empty-container">
      <s-image
        v-if="src"
        custom-class="s-empty-img"
        :src="src"
        :mode="imgMode"
        :width="imgWidth"
        :height="imgHeight"
        :custom-style="imgStyle"
      />
      <slot>
        <div class="s-empty-text" v-if="text" :style="c_textStyle">{{text}}</div>
      </slot>
    </div>
  </div>
</template>

<script>
import addUnit from '../../utils/addUnit';
import mergeStyle from '../../utils/mergeStyle';
import SImage from '../s-image/s-image';

export default {
  name: 's-empty',
  components: {
    SImage
  },
  props: {
    customClass: {
      type: [String, Object, Array],
      default: ''
    },
    src: {
      type: String,
      default: ''
    },
    height: {
      type: [String, Number],
      default: ''
    },
    margin: {
      type: [String, Number],
      default: ''
    },
    padding: {
      type: [String, Number],
      default: ''
    },
    customStyle: {
      type: [String, Object],
      default: ''
    },
    imgWidth: {
      type: [String, Number],
      default: 400
    },
    imgHeight: {
      type: [String, Number],
      default: ''
    },
    imgMode: {
      type: String,
      default: 'aspectFill'
    },
    imgStyle: {
      type: [String, Object],
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    fontSize: {
      type: [String, Number],
      default: 28
    },
    color: {
      type: String,
      default: '{textPlaceholder}'
    },
    textStyle: {
      type: [String, Object],
      default: ''
    }
  },
  computed: {
    c_style () {
      return mergeStyle({
        height: addUnit(this.height),
        margin: addUnit(this.margin),
        padding: addUnit(this.padding)
      }, this.customStyle);
    },
    c_textStyle () {
      return mergeStyle({
        fontSize: addUnit(this.fontSize),
        color: this.$sTheme(this.color)
      }, this.textStyle);
    }
  }
};
</script>

<style lang="scss">
.s-empty {
  display: flex;
  justify-content: center;
  align-items: center;

  &-container {
    font-size: 0;
    text-align: center;
  }

  &-text {
    margin-top: 30rpx;
    font-size: 28rpx;
  }
}
</style>
