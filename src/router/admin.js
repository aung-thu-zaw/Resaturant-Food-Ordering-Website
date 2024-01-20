import guest from '@/middlewares/guest'
import auth from '@/middlewares/auth'
import authorize from '@/middlewares/authorize'
import permission from '@/middlewares/permission'

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
            component: () => import('@/views/admin/Categories/Index.vue'),
            meta: { middleware: [permission('categories.view')] }
          },
          {
            path: 'create',
            name: 'admin.categories.create',
            component: () => import('@/views/admin/Categories/Create.vue'),
            meta: { middleware: [permission('categories.create')] }
          },
          {
            path: ':slug/edit',
            name: 'admin.categories.edit',
            props: true,
            component: () => import('@/views/admin/Categories/Edit.vue'),
            meta: { middleware: [permission('categories.edit')] }
          }
        ]
      },
      {
        path: 'roles',
        meta: { middleware: [authorize] },
        children: [
          {
            path: '',
            name: 'admin.roles.index',
            component: () => import('@/views/admin/AuthorityManagement/Roles/Index.vue'),
            meta: { middleware: [permission('roles.view')] }
          },
          {
            path: 'create',
            name: 'admin.roles.create',
            component: () => import('@/views/admin/AuthorityManagement/Roles/Create.vue'),
            meta: { middleware: [permission('roles.create')] }
          },
          {
            path: ':id/edit',
            name: 'admin.roles.edit',
            props: true,
            component: () => import('@/views/admin/AuthorityManagement/Roles/Edit.vue'),
            meta: { middleware: [permission('roles.edit')] }
          }
        ]
      }
    ]
  }
]
