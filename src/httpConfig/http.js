import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:80/cbserver'
// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  })
// axios.defaults.headers.post['Content-Type'] = 'application/json'

export default axios;
