<template>
  <div>
    <el-radio-group v-model="radio">
      <el-radio v-model="radio" :label='1'>同省</el-radio>
      <el-radio v-model="radio" :label='2'>同市</el-radio>
    </el-radio-group>
    <div class="D">
      <el-table
        :data="tableData"
      row-key="name">
        <el-table-column
          prop="name"></el-table-column>
      </el-table>
    </div>
    <div>
      开始时间：<el-date-picker
        v-model="startDate"
        type="datetime"
        placeholder="选择日期时间"
        default-time="12:00:00">
      </el-date-picker>
      截止时间：<el-date-picker
      v-model="endDate"
      type="datetime"
      placeholder="选择日期时间"
      default-time="12:00:00">
    </el-date-picker>
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs'

export default {
  name: 'RTTable',
  components: {
  },
  props: ['data'],
  data () {
    return {
      radio_list: ['同省', '同市'],
      radio: 1,
      tableData: [],
      startDate: '',
      endDate: '',
      objmap: Object.create(null)
    }
  },
  methods: {
    rowDrop () {
      const tbody = document.querySelector('.D .el-table__body-wrapper tbody')
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
    listTranfer (obj) {
      let objList = []
      for (let k in obj) {
        objList.push({ 'name': obj[k] })
      }
      return objList
    },
    toParentResult () {
      this.objmap['area'] = this.radio_list[this.radio - 1]
      this.objmap['order'] = this.tableData.map(item => {
        return item['name']
      })
      this.objmap['startDate'] = this.$moment(this.startDate).format('YYYY-MM-DD HH:mm:ss')
      this.objmap['endDate'] = this.$moment(this.endDate).format('YYYY-MM-DD HH:mm:ss')
      return this.objmap
    }
  },
  mounted () {
    this.rowDrop()
  },
  watch: {
    data: function (newVal, oldVal) {
      for (let k in this.radio_list) {
        if (newVal.area === this.radio_list[k]) {
          this.radio = Number(k) + 1
          console.log(this.radio)
        }
      }
      this.tableData = this.listTranfer(newVal.order)
      this.startDate = newVal.startDate
      this.endDate = newVal.endDate
    }

  }
}
</script>

<style scoped>

</style>
