<template>
  <div class="s-picker" :class="customClass">
    <s-popup
      :background="background"
      :z-index="zIndex"
      :value="visible"
      :position="position"
      :effect="effect"
      :effect-duration="effectDuration"
      :mask="mask"
      :mask-opacity="maskOpacity"
      :mask-close="maskClose"
      :before-show="beforeShow"
      @hide="hideAfter"
    >
      <s-hairline bottom-border :border-color="$sTheme('{borderLighter}')">
        <div class="s-picker-header">
          <div class="cancel-btn" :style="{color:$sTheme(cancelColor)}" @click="onCancel">{{cancelText}}</div>
          <div class="title" :style="{color:$sTheme(titleColor)}">{{title}}</div>
          <div
            class="confirm-btn"
            :style="{color:$sTheme(disabledConfirm?cancelColor:confirmColor)}"
            @click="onConfirm"
          >{{confirmText}}</div>
        </div>
      </s-hairline>
      <div class="s-picker-body">
        <picker-view
          v-if="showContent"
          :value="selectedIndexList"
          class="picker-view"
          @change="slideChage"
          @pickstart="onPickStart"
          @pickend="onPickEnd"
        >
          <picker-view-column v-for="(listItem,listIndex) of list" :key="listIndex">
            <div class="s-picker-item" v-for="(item,index) of listItem" :key="index">{{getLabelName(item)}}</div>
          </picker-view-column>
        </picker-view>
      </div>
    </s-popup>
  </div>
</template>

<script>
import SHairline from '../s-hairline/s-hairline';
import SPopup from '../s-popup/s-popup';

export default {
  name: 's-picker',
  components: {
    SPopup,
    SHairline
  },
  props: {
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
    // 标题
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
  },
  data () {
    return {
      selectedIndexList: [],
      showContent: false,
      disabledConfirm: false
    };
  },
  watch: {
    value () {
      this.setIndex(this.value);
    }
  },
  methods: {
    beforeShow () {
      setTimeout(() => {
        this.setIndex(this.value);
        this.showContent = true;
      }, 50);
      return true;
    },
    hideAfter () {
      this.hide();
      this.showContent = false;
    },
    hide () {
      this.$emit('update:visible', false);
    },
    getLabelName (item) {
      return (typeof item === 'object' && item) ? item[this.labelName] : item;
    },
    onPickStart () {
      this.disabledConfirm = true;
    },
    onPickEnd () {
      this.disabledConfirm = false;
    },
    slideChage (e) {
      this.setIndex(e.detail.value);
    },
    setIndex (indexList) {
      const prevSelectedIndexList = this.selectedIndexList.slice(0);
      this.selectedIndexList = indexList;
      this.selectedIndexList.some((selectedIndex, i) => {
        if (selectedIndex != prevSelectedIndexList[i]) {
          this.$emit('change', i, this.selectedIndexList);
          return true;
        }
      });
    },
    onCancel () {
      this.hide();
      this.$emit('cancel');
    },
    onConfirm () {
      if (!this.disabledConfirm) {
        this.$emit('input', this.selectedIndexList);
        this.$emit('confirm');
        this.hide();
      }
    }
  }
};
</script>

<style lang="scss">
.s-picker {
  &-header {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .cancel-btn,
    .confirm-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      font-size: 14px;
      padding: 0 15px;
    }

    .title {
      flex: 1;
      font-size: 18px;
      text-align: center;
    }
  }

  &-body {
    height: 250px;

    .picker-view {
      height: 100%;
    }
  }

  &-item {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    padding: 0 3px;
  }
}
</style>
