import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/restaurant/cart'

export default async function checkCartItems(to, from, next) {
  const authStore = useAuthStore()
  const cartStore = useCartStore()

  if (!authStore.currentUser) await authStore.getAuthenticatedUser()

  if (authStore.isAuthenticated && authStore.currentUser) {
    if (cartStore.cart && cartStore.cart?.cart_items?.length) {
      return next()
    } else {
      return next(from.fullPath)
    }
  }
}
