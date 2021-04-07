<template>
  <div :style="{ width: width + 'rpx', height: height + 'rpx' }" v-if="canvasId">
    <canvas
      v-if="showCanvas"
      :id="canvasId"
      :canvasId="canvasId"
      :style="{ width: width + 'rpx', height: height + 'rpx' }"
      @click="click"
    ></canvas>
    <image :style="{ width: width + 'rpx', height: height + 'rpx' }" v-else-if="renderImg && imgSrc" :src="imgSrc" />
  </div>
</template>

<script>
import Ucharts from '../../lib/u-charts';
import getUid from '../../utils/getUid';

const defaultOpts = {
  colors: ['#63b2ee', '#76da91', '#f8cb7f', '#f89588', '#7cd6cf', '#9192ab', '#7898e1', '#efa666', '#eddd86', '#9987ce', '#002c53', '#ffa510', '#0c84c6', '#ffbd66', '#f74d4d', '#2455a4', '#41b7ac'],
  fontSize: 12,
  formatToolTip (item, category) {
    return category + ' ' + item.name + ':' + item.data;
  }
};

export default {
  name: 's-charts',
  props: {
    width: {
      type: [Number, String],
      default: 750
    },
    height: {
      type: [Number, String],
      default: 500
    },
    renderImg: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      canvasId: '',
      pixelRatio: 1,
      showCanvas: true,
      imgSrc: '',
      isInit: false
    };
  },
  watch: {
    renderImg () {
      if (this.renderImg) {
        uni.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: this.cWidth,
          height: this.cHeight,
          canvasId: this.canvasId,
          complete: (res) => {
            this.showCanvas = false;
            this.imgSrc = res.tempFilePath;
          }
        }, this);
      } else {
        this.showCanvas = true;
        if (this.opts) {
          this.init({ animation: false });
        }
      }
    }
  },
  computed: {
    cWidth () {
      return uni.upx2px(parseInt(this.width));
    },
    cHeight () {
      return uni.upx2px(parseInt(this.height));
    }
  },
  created () {
    this.canvasId = 's-charts-' + getUid();
  },
  methods: {
    init (opts = {}) {
      this.opts = Object.assign({}, defaultOpts, this.opts, opts);
      this.$nextTick(() => {
        this.$uChart = new Ucharts({
          $this: this,
          canvasId: this.canvasId,
          width: this.cWidth,
          height: this.cHeight,
          ...this.opts
        });
      });
    },
    click (e) {
      if (this.$uChart) {
        this.$uChart.showToolTip(e, {
          format: this.opts.formatToolTip
        });
      }
    }
  }
};
</script>
