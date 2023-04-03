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
    component: () => import('@/views/Home'),
    redirect: '/home/Welcome',
    children: [
      {
        path: 'Welcome',
        component: () => import('@/views/Home/Welcome')
      },
      {
        path: 'users',
        component: () => import('@/views/Home/Users')
      },
      {
        path: 'rights',
        component: () => import('@/views/Home/Rights')
      },
      {
        path: 'roles',
        component: () => import('@/views/Home/Roles')
      },

    ]
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
