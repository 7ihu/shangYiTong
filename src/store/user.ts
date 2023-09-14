import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { getPhoneCodeAPI, getLoginAPI } from '@/apis/login'
import { getUserInfoAPI } from '@/apis/user'

export const useUserStore = defineStore('user', () => {
  const userState = ref(false)
  const userInfo = ref(JSON.parse(localStorage.getItem('userInfo') as string) || {})
  const phoneCode = ref('')
  const realInfo = ref()

  const userStateChange = (i: boolean) => {
    userState.value = i
  }
  // 验证码
  const getPhoneCode = async (phone: string) => {
    const res = await getPhoneCodeAPI(phone)
    if (res.data === null) return ElMessage({ type: 'error', message: '获取验证码频繁' })
    phoneCode.value = res.data
    ElMessage({ type: 'success', message: '验证码：' + phoneCode.value, duration: 7000 })
  }
  // 清除验证码
  const clearPhoneCode = () => (phoneCode.value = '')

  // 用户登录
  const getLogin = async (user: string) => {
    const res = await getLoginAPI({ phone: user, code: phoneCode.value })
    userState.value = false
    userInfo.value = res.data
    localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
    ElMessage({ type: 'success', message: '欢迎 ' + userInfo.value.name + ' 用户' })
    getRealInfo()
  }

  // 清除用户信息
  const clearUserInfo = () => {
    userInfo.value = {}
    localStorage.removeItem('userInfo')
  }

  // 获取用户实名信息
  const getRealInfo = async () => {
    const res = await getUserInfoAPI()
    if (res.data.name && res.data.certificatesNo) return (realInfo.value = res.data)
    return ElMessage({ type: 'error', message: '当前账户未实名' })
  }
  // 清除用户实名信息
  const clearRealInfo = () => (realInfo.value = '')

  return {
    userState,
    userInfo,
    phoneCode,
    realInfo,
    userStateChange,
    getPhoneCode,
    clearPhoneCode,
    getLogin,
    clearUserInfo,
    getRealInfo,
    clearRealInfo,
  }
})
