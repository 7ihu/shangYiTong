import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { getPhoneCodeAPI, getLoginAPI } from '@/apis/login'

export const useUserStore = defineStore('user', () => {
  const userState = ref(false)
  const userInfo = ref(JSON.parse(localStorage.getItem('userInfo') as string) || {})
  const phoneCode = ref('')

  const userStateChange = (i: boolean) => {
    userState.value = i
  }
  // 验证码
  const getPhoneCode = async (phone: string) => {
    const res = await getPhoneCodeAPI(phone)
    phoneCode.value = res.data
    if (res.data === null) return ElMessage({ type: 'error', message: '获取验证码频繁' })
    ElMessage({ type: 'success', message: '验证码：' + phoneCode.value, duration: 7000 })
  }
  // 清除验证码
  const clearPhoneCode = () => {
    phoneCode.value = ''
  }

  // 用户登录
  const getLogin = async (user: string) => {
    const res = await getLoginAPI({ phone: user, code: phoneCode.value })
    userState.value = false
    userInfo.value = res.data
    localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
    ElMessage({ type: 'success', message: '欢迎 ' + userInfo.value.name + ' 用户' })
  }

  // 清除用户信息
  const clearUserInfo = () => {
    userInfo.value = {}
    localStorage.removeItem('userInfo')
  }

  return {
    userState,
    userInfo,
    phoneCode,
    userStateChange,
    getPhoneCode,
    clearPhoneCode,
    getLogin,
    clearUserInfo,
  }
})
