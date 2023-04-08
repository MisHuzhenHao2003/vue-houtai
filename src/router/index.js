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
      {
        path: 'categories',
        component: () => import('@/views/Home/CateGories')
      },
      {
        path: 'goods',
        component: () => import('@/views/Home/Goods')
      },
      {
        path: 'addGoods',
        component: () => import('@/views/Home/AddGoods'),
      },
      {
        path: 'params',
        component: () => import('@/views/Home/Params')
      },
      {
        path: 'orders',
        component: () => import('@/views/Home/Orders')
      },
      {
        path: 'reports',
        component: () => import('@/views/Home/Reports')
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
