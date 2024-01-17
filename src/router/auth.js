export default [
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/Login.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/auth/ForgotPassword.vue')
  },
  {
    path: '/password-reset/:token',
    name: 'reset-password',
    component: () => import('@/views/auth/ResetPassword.vue')
  }
]
