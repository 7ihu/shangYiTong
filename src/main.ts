import { createApp } from 'vue'
import './style.css'
import '@/style/style.scss'
import App from './App.vue'
import HospitalTop from '@/components/HospitalTop/HospitalTop.vue'
import HospitalBottom from '@/components/HospitalBottom/HospitalBottom.vue'
import Login from '@/components/Login/Login.vue'
import router from '@/router/index.ts'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
// 引用中文 ts类型忽略
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { useUserStore } from './store/user'

const userStore = useUserStore(createPinia())

// 路由前置守卫
//@ts-ignore
router.beforeEach((to, from, next) => {
  // 判断用户是否登录
  if (userStore.userInfo.token || !to.meta.requiresAuth) {
    next()
  } else {
    const list = ['/user', '/user/info', '/user/realname', '/user/account', '/user/order', '/user/feedback', '/user/addinfo']
    if (list.includes(to.path) || !to.meta.requiresAuth) return router.replace('/')
    next()
  }
})

// 路由后置守卫
// router.afterEach((to, from) => {})

createApp(App).use(router).use(ElementPlus, { locale: zhCn }).use(createPinia()).component('HospitalTop', HospitalTop).component('HospitalBottom', HospitalBottom).component('Login', Login).mount('#app')
