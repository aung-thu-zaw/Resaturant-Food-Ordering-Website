import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/restaurant/Home.vue'
import Dashboard from '@/views/admin/Dashboard.vue'
import CategoryIndex from '@/views/admin/Categories/Index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/admin/dashboard',
      name: 'admin.dashboard',
      component: Dashboard
    },
    {
      path: '/admin/categories',
      name: 'admin.categories.index',
      component: CategoryIndex
    }
  ]
})

export default router
