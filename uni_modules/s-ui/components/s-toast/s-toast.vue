<template>
  <div v-if="state.isInit" class="s-toast" :class="className">
    <s-popup
      position="custom"
      max-width="80%"
      :background="state.background"
      :border-radius="10"
      :effect="state.effect"
      :effect-duration="state.effectDuration"
      :mask="state.mask"
      :mask-opacity="state.maskOpacity"
      :mask-close="false"
      :duration="0"
      :z-index="state.zIndex"
      :value="state.visible"
    >
      <div class="s-toast-wrap">
        <div class="s-toast-container" :style="{color:$sTheme(state.color)}">
          <template v-if="state.image || state.icon">
            <s-image v-if="state.image" custom-class="s-toast-image" :custom-style="state.imageStyle" :src="state.image" />
            <div v-else-if="state.icon" :class="['s-icon-'+state.icon,'s-toast-icon']"></div>
          </template>
          <div v-if="state.message!==''" class="s-toast-message">{{state.message}}</div>
        </div>
      </div>
    </s-popup>
  </div>
</template>

<script>
import SImage from '../s-image/s-image';
import SPopup from '../s-popup/s-popup';
import Toast from './index';

export default {
  name: 's-toast',
  components: {
    SPopup,
    SImage
  },
  options: {
    styleIsolation: 'shared'
  },
  data () {
    return {
      state: Toast.state
    };
  },
  computed: {
    className () {
      const classList = [];
      const { position, type, icon, image, className } = this.state;
      if (position) {
        classList.push(`s-toast-position-${position}`);
      }
      if (type) {
        classList.push(`s-toast-${type}`);
      }
      if (icon || image) {
        classList.push('s-toast-has-icon');
      }
      if (className) {
        classList.push(className);
      }
      return classList.join(' ');
    }
  }
};
</script>

<style lang="scss">
.s-toast {
  ::v-deep .s-popup {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 26rpx 32rpx;
    min-width: 240rpx;
    box-sizing: border-box;
  }
  &-icon {
    font-size: 66rpx;
    line-height: 1;
  }
  &-image {
    font-size: 66rpx;
    line-height: 1;
    display: block;
    width: 1em;
    height: 1em;
  }
  &-message {
    font-size: 26rpx;
    line-height: 1.5;
    text-align: center;
  }
  &.s-toast-has-icon &-wrap {
    padding: 30rpx;
    min-width: 200rpx;
    min-height: 200rpx;
  }
  &.s-toast-has-icon &-message {
    margin-top: 12rpx;
  }
  // 居上
  &.s-toast-position-top {
    ::v-deep .s-popup {
      align-items: flex-start;
      .s-popup-wrap {
        top: 20%;
      }
    }
  }
  // 居下
  &.s-toast-position-bottom {
    ::v-deep .s-popup {
      align-items: flex-end;
      .s-popup-wrap {
        bottom: 20%;
      }
    }
  }
}
</style>
