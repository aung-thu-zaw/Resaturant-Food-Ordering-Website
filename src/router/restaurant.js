export default [
  /***** Home *****/
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/restaurant/Home.vue')
  },

  /***** About *****/
  {
    path: '/about-us',
    name: 'about-us',
    component: () => import('@/views/restaurant/About.vue')
  },

  /***** Chef *****/
  {
    path: '/chefs',
    name: 'chefs',
    component: () => import('@/views/restaurant/Chefs.vue')
  },

  /***** Menu *****/
  {
    path: '/menu',
    name: 'menu',
    component: () => import('@/views/restaurant/Menu/Index.vue')
  },
  {
    path: '/menu/detail',
    name: 'menu.detail',
    component: () => import('@/views/restaurant/Menu/Show.vue')
  },

  /***** Blog *****/
  {
    path: '/blogs',
    name: 'blogs.index',
    component: () => import('@/views/restaurant/Blogs/Index.vue')
  },
  {
    path: '/blogs/detail',
    name: 'blogs.detail',
    component: () => import('@/views/restaurant/Blogs/Show.vue')
  },

  /***** Contact *****/
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/restaurant/Contact.vue')
  }
]
