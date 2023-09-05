import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('@/view/Home/Home.vue') },
    { path: '/home', component: () => import('@/view/Home/Home.vue') },
    { path: '/hospital', component: () => import('@/view/Hospital/Hospital.vue') },
  ],
  // 滚动 - 控制页面导航后显示顶部
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
    }
  },
})
