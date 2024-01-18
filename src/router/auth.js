import guest from '@/middlewares/guest'

export default [
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/Register.vue'),
    meta: {
      middleware: [guest]
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/Login.vue'),
    meta: {
      middleware: [guest]
    }
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/auth/ForgotPassword.vue'),
    meta: {
      middleware: [guest]
    }
  },
  {
    path: '/password-reset/:token',
    name: 'reset-password',
    component: () => import('@/views/auth/ResetPassword.vue'),
    meta: {
      middleware: [guest]
    }
  }
]
