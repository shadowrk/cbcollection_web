import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    user_name: localStorage.getItem('user_name') ? localStorage.getItem('user_name') : ''
  },
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
      state.Authorization = user.Authorization
      localStorage.setItem('Authorization', user.Authorization)
      state.user_name = user.user_name
      localStorage.setItem('user_name', user.user_name)
    }
  },
  actions: {
  },
  modules: {
  }
})
