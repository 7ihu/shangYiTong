import { createApp } from 'vue'
import './style.css'
import '@/style/style.scss'
import App from './App.vue'
import HospitalTop from '@/components/HospitalTop/HospitalTop.vue'
import HospitalBottom from '@/components/HospitalBottom/HospitalBottom.vue'
import router from '@/router/index.ts'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
// 引用中文 ts类型忽略
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

createApp(App).use(router).use(ElementPlus, { locale: zhCn }).use(createPinia()).component('HospitalTop', HospitalTop).component('HospitalBottom', HospitalBottom).mount('#app')
