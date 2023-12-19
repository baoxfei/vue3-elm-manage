import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import type { App } from 'vue'
import DashBoard from '@/views/dashboard/Index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DashBoard
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashBoard,
      children: [
        {
          path: '/panel',
          name: 'panel',
          component: import('@/views/dashboard/Panel.vue')
        },
        {
          path: '/addShop',
          name: 'addShop',
          component: import('@/views/dashboard/addShop.vue'),
          meta: {}
        },
        {
          path: '/shopList',
          name: 'shopList',
          component: import('@/views/dashboard/ShopList.vue'),
          meta: {}
        },
        {
          path: '/goods',
          name: 'goods',
          component: import('@/views/dashboard/Goods.vue'),
          meta: {}
        },
        {
          path: '/addGoods',
          name: 'addGoods',
          component: import('@/views/dashboard/addGoods.vue'),
          meta: {}
        }
      ]
    }
  ]
})

export const setupRouter = (app: App) => {
  app.use(router)
}

export default router
