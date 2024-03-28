import { createRouter, createWebHashHistory } from "vue-router";
import { localCache } from '@/utils/cache'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/main',
      name: 'Main',
      component: () => import('../views/main/main.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Login') {
    next()
  } else {
    const token = localCache.getItem('token')
    if (!token) {
      next({ name: 'Login' })
    } else {
      next()
    }
  }
})

export default router;