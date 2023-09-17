import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('@/view/Home/Home.vue') },
    { path: '/home', component: () => import('@/view/Home/Home.vue') },
    {
      path: '/hospital/:id',
      component: () => import('@/view/Hospital/Hospital.vue'),
      children: [
        { path: '', component: () => import('@/view/Hospital/components/HosInfo/HosInfo.vue') },
        { path: 'info', component: () => import('@/view/Hospital/components/HosInfo/HosInfo.vue') },
        { path: 'registration', component: () => import('@/view/Hospital/components/HosRegistration/HosRegistration.vue') },
        { path: 'notice', component: () => import('@/view/Hospital/components/HosNotice/HosNotice.vue') },
        { path: 'diagnosis', component: () => import('@/view/Hospital/components/HosDiagnosis/HosDiagnosis.vue') },
        { path: 'querycancel', component: () => import('@/view/Hospital/components/HosQueryCancel/HosQueryCancel.vue') },
        {
          path: 'department',
          component: () => import('@/view/Hospital/components/HosDepartment/HosDepartment.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'visitor',
          component: () => import('@/view/Hospital/components/HosVisitor/HosVisitor.vue'),
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: '/user',
      component: () => import('@/view/User/User.vue'),
      children: [
        { path: '', component: () => import('@/view/User/components/UserRealName/UserRealName.vue') },
        { path: 'realname', component: () => import('@/view/User/components/UserRealName/UserRealName.vue') },
        { path: 'order', component: () => import('@/view/User/components/UserOrder/UserOrder.vue') },
        { path: 'info', component: () => import('@/view/User/components/UserInfo/UserInfo.vue') },
        { path: 'account', component: () => import('@/view/User/components/UserAccount/UserAccount.vue') },
        { path: 'feedback', component: () => import('@/view/User/components/UserFeedback/UserFeedback.vue') },
        { path: 'addinfo', component: () => import('@/view/User/components/UserAddInfo/UserAddInfo.vue') },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/components/NotFound/NotFound.vue'),
    },
  ],
  // 滚动 - 控制页面导航后显示顶部
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
    }
  },
})
