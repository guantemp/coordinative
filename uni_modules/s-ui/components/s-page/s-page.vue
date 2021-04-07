<template>
  <div class="s-page" :class="pageClass" :style="c_style">
    <!-- 页面内容 -->
    <slot></slot>
    <!-- toast -->
    <s-toast />
    <!-- dialog -->
    <s-dialog />
  </div>
</template>

<script>
import mergeStyle from '../../utils/mergeStyle';
import sToast from '../s-toast/s-toast';
import sDialog from '../s-dialog/s-dialog';

export default {
  name: 's-page',
  components: {
    sToast,
    sDialog
  },
  props: {
    pageClass: {
      required: true,
      type: [String, Object, Array],
      default: ''
    },
    customStyle: {
      type: [Object, String],
      default: ''
    }
  },
  computed: {
    c_style () {
      return mergeStyle(this.customStyle);
    }
  }
};
</script>
