import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

const http = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
http.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    ElMessage({ type: 'error', message: err.message })
    return err
  }
)

export default http