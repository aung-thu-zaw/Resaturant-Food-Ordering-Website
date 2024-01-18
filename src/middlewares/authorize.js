import { useAuthStore } from '@/stores/auth'

export default async function authorizeMiddleware(to, from, next) {
  const authStore = useAuthStore()

  await authStore.getAuthenticatedUser()

  const condition =
    authStore.isAuthenticated && authStore.currentUser && authStore.currentUser.role === 'admin'

  if (condition) {
    next()
  } else {
    next({ name: 'errors', query: { status: 403 } })
  }
}
