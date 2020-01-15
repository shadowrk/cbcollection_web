<template>
  <div class="C">
    <el-table
      :data="tableData"
    row-key="name">
      <el-table-column
        label="T-R顺序"
        prop="name">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
export default {
  name: 'TRTable',
  components: {
  },
  props: ['data'],
  data () {
    return {
      showInput: true,
      tableData: []
    }
  },
  methods: {
    rowDrop () {
      const tbody = document.querySelector('.C .el-table__body-wrapper tbody')
      const _this = this
      Sortable.create(tbody, {
        sort: true,
        delay: 0,
        animation: 180,
        onEnd: evt => {
          let currRow = _this.tableData.splice(evt.oldIndex, 1)[0]
          _this.tableData.splice(evt.newIndex, 0, currRow)
          let newSubListArray = _this.tableData.slice(0)
          _this.tableData = []
          _this.$nextTick(function () {
            _this.tableData = newSubListArray
          })
        }
      })
    },
    toParentResult () {
      return this.tableData.map(item => {
        return item['name']
      })
    }
  },
  mounted () {
    this.rowDrop()
  },
  watch: {
    data: function (newVal, oldVal) {
      this.tableData = newVal
    }
  }
}
</script>

<style scoped>

</style>
