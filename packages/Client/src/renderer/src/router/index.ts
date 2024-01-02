import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/index.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home/index.vue'),
      children: [
        {
          path: '',
          name: 'message',
          components: {
            default: () => import('@/components/Message.vue'),
            chatroom: () => import('@/components/Chat.vue')
          }
        },
        {
          path: 'friends',
          name: 'friends',
          components: {
            default: () => import('@/components/Friends.vue'),
            chatroom: () => import('@/views/Home/components/ChatRoom.vue')
          }
        }
      ]
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/Test/index.vue')
    }
  ]
})

export default router
