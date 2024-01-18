import guest from '@/middlewares/guest'
import auth from '@/middlewares/auth'
import authorize from '@/middlewares/authorize'

export default [
  {
    path: '/admin/login',
    name: 'admin.login',
    component: () => import('@/views/admin/Login.vue'),
    meta: { middleware: [guest] }
  },
  {
    path: '/admin',
    meta: { middleware: [auth, authorize] },
    children: [
      {
        path: 'dashboard',
        name: 'admin.dashboard',
        component: () => import('@/views/admin/Dashboard.vue'),
        meta: { middleware: [authorize] }
      },
      {
        path: 'categories',
        meta: { middleware: [authorize] },
        children: [
          {
            path: '',
            name: 'admin.categories.index',
            component: () => import('@/views/admin/Categories/Index.vue')
          },
          {
            path: 'create',
            name: 'admin.categories.create',
            component: () => import('@/views/admin/Categories/Form.vue')
          },
          {
            path: 'trashed',
            name: 'admin.categories.trashed',
            component: () => import('@/views/admin/Categories/Trash.vue')
          }
        ]
      }
    ]
  }
]
