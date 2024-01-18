import { createRouter, createWebHistory } from 'vue-router'
import restaurantRoutes from './restaurant'
import adminRoutes from './admin'
import authRoutes from './auth'
import errorRoutes from './error'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...restaurantRoutes, ...adminRoutes, ...authRoutes, ...errorRoutes]
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.middleware) {
    for (const middleware of to.meta.middleware) {
      await middleware(to, from, next)
    }
  } else {
    next()
  }
})

export default router
