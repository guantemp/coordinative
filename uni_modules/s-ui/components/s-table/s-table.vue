<template>
  <div class="s-table" :class="[{'s-table-border':border},{'s-table-center':center}]">
    <div class="s-table-header">
      <div
        class="s-table-th"
        v-for="(column,columnIndex) of columns"
        :key="columnIndex"
        :style="getColumnWidth(column)+';'+borderStyle"
        @click="thClick(column,columnIndex)"
      >
        {{column.title}}
        <div class="s-table-sort-wrap" v-if="hasSort(column)">
          <div
            class="sort-icon"
            :style="{color:$sTheme(column.sortBy == sortBy && sortOrder == 'asc'? sortActiveColor:sortColor)}"
          ></div>
          <div
            class="sort-icon"
            :style="{color:$sTheme(column.sortBy == sortBy && sortOrder == 'desc'? sortActiveColor:sortColor)}"
          ></div>
        </div>
      </div>
    </div>
    <div class="s-table-body">
      <div class="s-table-tr" :class="[getRowClassName(row,rowIndex)]" v-for="(row,rowIndex) of list" :key="rowIndex">
        <div
          class="s-table-td"
          v-for="(column,columnIndex) of columns"
          :key="columnIndex"
          :style="getColumnWidth(column)+';'+borderStyle"
        >
          <slot :row="row" :rowIndex="rowIndex" :column="column" :columnIndex="columnIndex" :parent="parent">{{row[column.key]}}</slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getPropsFnByParents from '../../utils/getPropsFnByParents';

export default {
  name: 's-table',
  props: {
    // 表头 [{title: '排名',key: 'index',width: 120，sortBy: '4'}]
    columns: {
      default: () => []
    },
    // 数据列表
    list: {
      type: Array,
      default: () => []
    },
    // 文字是否居中
    center: {
      type: Boolean,
      default: true
    },
    // 是否显示边框
    border: {
      type: Boolean,
      default: false
    },
    // 边框颜色
    borderColor: {
      type: String,
      default: '{borderBase}'
    },
    // 行 class rowClassName(row, rowIndex)
    rowClassName: {
      type: [Function, String],
      default: ''
    },
    // 排序字段，sort-by.sync双向绑定用于获取
    sortBy: {
      default: ''
    },
    // 排序顺序，asc | desc sort-order.sync 双向绑定用于获取
    sortOrder: {
      type: String,
      default: ''
    },
    // 排序icon颜色
    sortColor: {
      type: String,
      default: '{textSecondary}'
    },
    // 排序icon激活颜色
    sortActiveColor: {
      type: String,
      default: '{primary}'
    }
  },
  computed: {
    parent () {
      return this.$parent.$data;
    },
    borderStyle () {
      return this.border ? `border: 2rpx solid ${this.$sTheme(this.borderColor)}` : '';
    }
  },
  methods: {
    hasSort (column) {
      return typeof column.sortBy !== 'undefined';
    },
    getColumnWidth (column) {
      const w = column.width;
      if (w) {
        if (String(w).indexOf('%') > -1) {
          return 'flex: 0 0 ' + w;
        } else {
          return 'flex: 0 0 ' + parseInt(w) + 'rpx';
        }
      }
      return 'flex: 1 0 0';
    },
    getRowClassName (row, rowIndex) {
      if (typeof this.rowClassName === 'function') {
        return getPropsFnByParents(this, this.rowClassName)(row, rowIndex);
      }
      return this.rowClassName;
    },
    thClick (column, columnIndex) {
      if (this.hasSort(column)) {
        if (this.sortBy != column.sortBy) {
          this.$emit('update:sortBy', column.sortBy);
          this.$emit('update:sortOrder', 'asc');
        } else {
          if (this.sortOrder == 'asc') {
            this.$emit('update:sortOrder', 'desc');
          } else {
            this.$emit('update:sortOrder', 'asc');
          }
        }
        this.$emit('sort', column, columnIndex);
      }
    }
  }
};
</script>

<style lang="scss">
.s-table {
  &-header,
  &-tr {
    display: flex;
  }

  &-th,
  &-td {
    display: flex;
    align-items: center;
    padding: 10rpx;
    min-height: 60rpx;
    box-sizing: border-box;
  }

  &-center &-th,
  &-center &-td {
    text-align: center;
    justify-content: center;
  }

  &-border &-th,
  &-border &-td {
    &:not(:last-child) {
      border-right: 0 !important;
    }
  }
  &-border &-tr &-td {
    border-top: 0 !important;
  }

  &-sort-wrap {
    margin-left: 0.25em;
    .sort-icon {
      width: 0;
      height: 0;
      border-right: 0.24em solid transparent;
      border-left: 0.24em solid transparent;

      &:first-child {
        border-bottom: 0.33em solid currentColor;
      }

      &:last-child {
        border-top: 0.33em solid currentColor;
        margin-top: 0.14em;
      }
    }
  }
}
</style>
