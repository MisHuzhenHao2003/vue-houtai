import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/home',
    component: () => import('@/views/Home')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 挂载前置路由守卫
router.beforeEach((to, from, next) => {
  console.log(1)
  if (to.path == '/login') return next()
  let tokenStr = sessionStorage.getItem('TOKEN')
  if (!tokenStr) return next('/login')
  next()
})

export default router
