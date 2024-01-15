import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/restaurant/Home.vue'
import Dashboard from '@/views/admin/Dashboard.vue'
import CategoryIndex from '@/views/admin/Categories/Index.vue'
import CategoryForm from '@/views/admin/Categories/Form.vue'
import CategoryTrash from '@/views/admin/Categories/Trash.vue'

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
    },
    {
      path: '/admin/categories/create',
      name: 'admin.categories.create',
      component: CategoryForm
    },
    {
      path: '/admin/categories/trashed',
      name: 'admin.categories.trashed',
      component: CategoryTrash
    }
  ]
})

export default router
