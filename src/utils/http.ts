import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'

const http = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.userInfo.token) {
      config.headers.token = userStore.userInfo.token
    }
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
