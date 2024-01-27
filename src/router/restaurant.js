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
  },

  /***** Blog *****/
  {
    path: '/blogs',
    name: 'blogs.index',
    component: () => import('@/views/restaurant/Blogs/Index.vue')
  },
  {
    path: '/blogs/:slug',
    name: 'blogs.detail',
    component: () => import('@/views/restaurant/Blogs/Show.vue')
  }
]
