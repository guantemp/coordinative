<template>
  <div class="s-search" :class="{'is-fixed':fixed}" :style="{height:height+'rpx'}">
    <div class="s-search-panel" :style="c_style">
      <slot name="left"></slot>
      <div class="s-search-conent" :style="{background:$sTheme(inputBackground)}">
        <text class="s-icon-search s-search-icon" :style="{color:$sTheme(searchIconColor)}"></text>
        <input
          class="s-search-input"
          type="text"
          confirm-type="search"
          :placeholder="placeholder"
          :placeholder-style="`color:${$sTheme(placeholderColor)}`"
          :adjust-position="false"
          :value="value"
          :style="{color:$sTheme(color)}"
          @input="handleInput"
          @confirm="handleSearch"
        />
      </div>
      <div class="s-search-action" v-if="showAction">
        <slot name="action">
          <div @click="handleAction" :style="{color:$sTheme(actionColor)}">{{actionText}}</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { addUnit } from '../../utils';
import mergeStyle from '../../utils/mergeStyle';

export default {
  name: 's-search',
  props: {
    fixed: {
      type: Boolean,
      default: false
    },
    height: {
      type: [String, Number],
      default: 80
    },
    padding: {
      type: [String, Number],
      default: '10rpx 30rpx'
    },
    placeholder: {
      type: String,
      default: '请输入搜索关键字'
    },
    placeholderColor: {
      type: String,
      default: '{textPlaceholder}'
    },
    value: {
      default: ''
    },
    background: {
      type: String,
      default: '{bgBase}'
    },
    inputBackground: {
      type: String,
      default: '{white}'
    },
    color: {
      type: String,
      default: '{textPrimary}'
    },
    searchIconColor: {
      type: String,
      default: '{textRegular}'
    },
    showAction: {
      type: Boolean,
      default: false
    },
    actionText: {
      type: String,
      default: '搜索'
    },
    actionColor: {
      type: String,
      default: '{primary}'
    }
  },
  computed: {
    c_style () {
      return mergeStyle({
        height: addUnit(this.height),
        padding: addUnit(this.padding),
        background: this.$sTheme(this.background)
      });
    }
  },
  methods: {
    mergeStyle,
    handleInput (e) {
      this.$emit('input', String(e.detail.value).trim());
    },
    handleSearch () {
      this.$emit('search', this.value);
    },
    handleAction () {
      this.$emit('action', this.value);
    }
  }
};
</script>

<style lang="scss">
.s-search {
  &-panel {
    display: flex;
    box-sizing: border-box;
  }

  &.is-fixed &-panel {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 9;
  }

  &-conent {
    flex: 1;
    height: 100%;
    border-radius: 5rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-action {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 20rpx;
  }

  &-icon {
    font-size: 34rpx;
    margin-left: 25rpx;
  }

  &-input {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 26rpx;
    padding: 0 20rpx;
  }
}
</style>
