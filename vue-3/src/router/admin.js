export default [
  {
    path: '/admin/login',
    name: 'admin.login',
    component: () => import('@/views/admin/Login.vue')
  },
  {
    path: '/admin',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'admin.dashboard',
        component: () => import('@/views/admin/Dashboard.vue')
      },
      {
        path: 'categories',
        children: [
          {
            path: '/',
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
