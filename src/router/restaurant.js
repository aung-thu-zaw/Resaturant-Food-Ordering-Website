export default [
  /***** Home *****/
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/restaurant/Home.vue')
  },

  /***** Menu *****/
  {
    path: '/menu',
    name: 'menu',
    component: () => import('@/views/restaurant/Menu.vue')
  }
]
