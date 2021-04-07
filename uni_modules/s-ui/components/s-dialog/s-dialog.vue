<template>
  <div v-if="state.isInit" class="s-dialog" :class="state.className">
    <s-popup
      width="80%"
      :border-radius="10"
      :background="state.background"
      :position="state.position"
      :effect="state.effect"
      :effect-duration="state.effectDuration"
      :mask="state.mask"
      :mask-opacity="state.maskOpacity"
      :mask-close="state.maskClose"
      :z-index="state.zIndex"
      :value="state.visible"
    >
      <div class="s-dialog-content">
        <div class="s-dialog-header" v-if="state.title !== ''" :style="{color:$sTheme(state.titleColor)}">{{state.title}}</div>
        <div
          class="s-dialog-message"
          v-if="state.message !== '' || state.content !== ''"
          :style="{color:$sTheme(state.messageColor)}"
        >{{state.message || state.content}}</div>
        <s-hairline
          top-border
          :border-color="$sTheme('{borderLighter}')"
          v-if="(state.showCancel && state.cancelText !== '') || state.confirmText !== ''"
        >
          <div class="s-dialog-footer">
            <div class="s-dialog-btn-wrap" v-if="state.showCancel && state.cancelText !== ''">
              <s-hairline right-border :border-color="$sTheme('{borderLighter}')">
                <button
                  :class="state.cancelClass"
                  :style="{color:$sTheme(state.cancelColor)}"
                  @click="state.onCancel"
                >{{state.cancelText}}</button>
              </s-hairline>
            </div>
            <div class="s-dialog-btn-wrap" v-if="state.confirmText !== ''">
              <button
                :class="state.confirmClass"
                :style="{color:$sTheme(state.confirmColor)}"
                @click="state.onConfirm"
              >{{state.confirmText}}</button>
            </div>
          </div>
        </s-hairline>
      </div>
    </s-popup>
  </div>
</template>

<script>
import SHairline from '../s-hairline/s-hairline.vue';
import SPopup from '../s-popup/s-popup';
import Dialog from './index';

export default {
  name: 's-dialog',
  components: {
    SPopup,
    SHairline
  },
  data () {
    return {
      state: Dialog.state
    };
  }
};
</script>

<style lang="scss">
.s-dialog {
  .s-dialog-header {
    padding-top: 40rpx;
    font-size: 36rpx;
    text-align: center;
    font-weight: bold;
  }

  .s-dialog-message {
    max-height: 60vh;
    padding: 50rpx 32rpx;
    overflow-y: auto;
    font-size: 28rpx;
    line-height: 1.5;
    white-space: pre-wrap;
    text-align: center;
    word-wrap: break-word;
  }

  .s-dialog-footer {
    display: flex;
    .s-dialog-btn-wrap {
      flex: 1;
    }
    .s-btn {
      width: 100%;
      height: 100rpx;
      font-size: 30rpx;
      font-weight: bold;
    }
  }
}
</style>
