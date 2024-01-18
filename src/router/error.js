import noDirectAccess from '@/middlewares/noDirectAccess'

export default [
  {
    path: '/:pathMatch(.*)*',
    name: 'catch.all',
    component: () => import('@/views/Error.vue'),
    props: () => ({ status: 404 })
  },

  {
    path: '/errors',
    name: 'errors',
    component: () => import('@/views/Error.vue'),
    props: (route) => ({ status: route.query.status }),
    meta: {
      middleware: [noDirectAccess]
    }
  }
]
