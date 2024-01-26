import { useAuthStore } from '@/stores/auth'

export default async function authorize(to, from, next) {
  const authStore = useAuthStore()

  if (!authStore.currentUser) await authStore.getAuthenticatedUser()

  const condition =
    authStore.isAuthenticated && authStore.currentUser && authStore.currentUser.role === 'admin'

  if (condition) {
    next()
  } else if (!authStore.isAuthenticated) {
    next({ name: 'admin.login' })
  } else {
    next({ name: 'errors', query: { status: 403 } })
  }
}
