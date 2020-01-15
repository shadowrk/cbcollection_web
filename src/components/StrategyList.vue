<template>
  <div>
    <span >策略列表</span>
    <el-menu>
      <el-menu-item
        :index="index+''"
        v-for="(item, index) in strategies"
        :key="index"
        @click="handleMenuClick(item)"
        >{{ item }}</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'StrategyList',
  data () {
    return {
      userName: this.$store.state.user_name,
      strategies: []
    }
  },
  methods: {
    handleMenuClick (item) {
      this.$emit('itemChanged', item)
    },
    // 获取用户策略列表
    getStrategies () {
      this.$http.get('/strategy/strategylist', {
        params: {
          name: this.userName
        }
      }).then((response) => {
        this.strategies = response.data
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.getStrategies()
  }
}
</script>

<style scoped>

</style>
