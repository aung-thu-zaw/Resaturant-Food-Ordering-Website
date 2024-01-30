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
    path: '/menus',
    name: 'menus.index',
    component: () => import('@/views/restaurant/Menus/Index.vue')
  },
  {
    path: '/menus/:slug',
    name: 'menus.show',
    props: (route) => ({ slug: String(route.params.slug) }),
    component: () => import('@/views/restaurant/Menus/Show.vue')
  },

  /***** Blog *****/
  {
    path: '/blogs',
    name: 'blogs.index',
    component: () => import('@/views/restaurant/Blogs/Index.vue')
  },
  {
    path: '/blogs/:slug',
    name: 'blogs.show',
    props: (route) => ({ slug: String(route.params.slug) }),
    component: () => import('@/views/restaurant/Blogs/Show.vue')
  },

  /***** Contact *****/
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/restaurant/Contact.vue')
  }
]
