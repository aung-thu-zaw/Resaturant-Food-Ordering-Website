import auth from '@/middlewares/auth'

export default [
  /***** My Account *****/
  {
    path: '/my-account',
    name: 'my-account',
    component: () => import('@/views/user/MyAccount/Index.vue'),
    meta: { middleware: [auth] }
  },

  /***** My Orders *****/
  {
    path: '/my-orders',
    name: 'my-orders',
    component: () => import('@/views/user/MyOrders.vue'),
    meta: { middleware: [auth] }
  },

  /***** My Wishlists *****/
  {
    path: '/wishlists',
    name: 'wishlists',
    component: () => import('@/views/user/Wishlists.vue'),
    meta: { middleware: [auth] }
  }
]
