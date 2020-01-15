<template>
  <div>
    <span>客户列表</span>
    <el-menu>
      <el-menu-item
        :index="index+''"
        v-for="(item, index) in customers"
        :key="item.id">{{ item.name }}</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'CustomersList',
  data () {
    return {
      userName: this.$store.state.user_name,
      customers: []
    }
  },
  methods: {
    // 获取客户列表
    getCustomers () {
      this.$http.get('/customers', {
        params: {
          userName: this.userName
        }
      }).then((response) => {
        this.customers = response.data
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  mounted () {
    this.getCustomers()
  }
}
</script>

<style scoped>

</style>
