<template>
  <div class="home">
    <h1>Element ui表格组件+sortablejs实现行拖拽排序</h1>
    <el-table
      size="small"
      :data="tableData"
    >
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
<!--      <el-table-column-->
<!--        show-overflow-tooltip-->
<!--        v-for="(item, index) in col"-->
<!--        :key="`col_${index}`"-->
<!--        :prop="col[index].prop"-->
<!--        :label="item.label"-->
<!--      >-->
<!--        <template slot-scope="scope">-->
<!--          <p>{{ scope.row[item.prop] }}</p>-->
<!--          <p v-if="item.label === '操作'">-->
<!--            <el-button size="mini" type="success">上架</el-button>-->
<!--          </p>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
export default {
  name: 'DragTable',
  props: ['tableData'],
  mounted () {
    this.rowDrop()
  },
  methods: {
    rowDrop () {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      Sortable.create(tbody)
    }
  }
}
</script>

<style scoped>

</style>
