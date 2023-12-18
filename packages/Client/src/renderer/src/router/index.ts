import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/Login/index.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/Home/index.vue')
    }
  ]
})

export default router
