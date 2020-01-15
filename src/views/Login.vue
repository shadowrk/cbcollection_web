<template>
    <div>
      <div style="border:1px black solid;border-radius:10px;width:400px;height:400px;position: absolute;top:150px;left:35%" >
        <div style="position: absolute;top:100px;left:25%">
        <br>
        <el-input type="text" v-model="user.name" placeholder="用户名" style="width: 100%;"></el-input>
        <br>
        <br>
        <el-input type="text" v-model="user.pwd" placeholder="密码" style="width: 100%;"></el-input>
        <br>
        <br>
        <el-button @click="login">登录</el-button>
        </div>
      </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        name: '',
        pwd: ''
      }
    }
  },
  methods: {
    ...mapMutations(['changeLogin']),
    login () {
      let _this = this
      if (this.user.name === '' || this.user.pwd === '') {
        alert('账号密码不能为空')
      } else {
        this.$http({
          method: 'post',
          url: '/user/login',
          data: _this.user
        }).then(res => {
          console.log(res)
          if (res.data.code === 1) {
            _this.userToken = res.data.token
            // 将用户token保存到vuex中
            _this.$store.commit('changeLogin', { Authorization: _this.userToken, user_name: _this.user.name })
            // _this.changeLogin({ Authorization: _this.userToken })
            _this.$router.push({ name: 'home', params: { 'user_name': _this.user.name } })
            alert('登录成功')
          } else if (res.data.code === 0) {
            alert(res.data.message)
          }
        }).catch(error => {
          alert('账号或密码错误')
          console.log(error)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
