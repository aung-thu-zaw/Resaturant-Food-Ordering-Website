import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/restaurant/HomeView.vue'
import Dashboard from '@/views/admin/DashboardView.vue'

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
      name: 'admin-dashboard',
      component: Dashboard
    }
  ]
})

export default router
