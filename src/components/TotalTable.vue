<template>
  <div class="A">
    <el-table
    :data="tableData"
    @cell-dblclick="handleCurrentChange"
    size="small"
    row-key="set">
      <el-table-column
      label="集合"
      prop="set"
       ></el-table-column>
      <el-table-column
      label="人数"
      prop="numbers"
      >
        <template slot-scope="scope">
          <el-input size="small" v-model="scope.row.numbers"
          @change="handleEdit(scope.$index, scope.row)"
          :disabled="showInput"></el-input>
<!--          <span v-if="showSpan">{{ scope.row.numbers }}</span>-->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
export default {
  name: 'TotalTable',
  components: {
  },
  props: ['collectionOrder'],
  data () {
    return {
      showInput: true,
      tableData: [],
      objmap: Object.create(null)
    }
  },
  methods: {
    handleCurrentChange (row, column, cell, event) {
      if (column.label === '人数') {
        this.showInput = false
      }
    },
    handleEdit (index, row) {
      this.showInput = true
      console.log(this.tableData)
    },
    rowDrop () {
      const tbody = document.querySelector('.A .el-table__body-wrapper tbody')
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
      for (let i in this.tableData) {
        let k = this.tableData[i].set
        let v = Number(this.tableData[i].numbers)
        this.objmap[k] = v
      }
      return this.objmap
    }
  },
  mounted () {
    this.rowDrop()
  },
  watch: {
    collectionOrder: function (newVal, oldVal) {
      this.tableData = newVal
    }
  }
}
</script>

<style scoped>

</style>
