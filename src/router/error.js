export default [
  {
    path: '/400',
    name: 'errors.400',
    component: () => import('@/views/errors/400.vue')
  },
  {
    path: '/401',
    name: 'errors.401',
    component: () => import('@/views/errors/401.vue')
  },
  {
    path: '/403',
    name: 'errors.403',
    component: () => import('@/views/errors/403.vue')
  },
  {
    path: '/404',
    name: 'errors.404',
    component: () => import('@/views/errors/404.vue')
  },
  {
    path: '/429',
    name: 'errors.429',
    component: () => import('@/views/errors/429.vue')
  },
  {
    path: '/500',
    name: 'errors.500',
    component: () => import('@/views/errors/500.vue')
  },
  {
    path: '/503',
    name: 'errors.503',
    component: () => import('@/views/errors/503.vue')
  }
]
