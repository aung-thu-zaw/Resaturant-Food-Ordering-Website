import { useAuthStore } from '@/stores/auth'

export default function authorizePermission(permission) {
  return async (to, from, next) => {
    const authStore = useAuthStore()

    if (!authStore.currentUser) await authStore.getAuthenticatedUser()

    const condition =
      authStore.isAuthenticated &&
      authStore.currentUser &&
      authStore.currentUser.role === 'admin' &&
      authStore.currentUser?.permissions?.includes(permission)

    if (condition) {
      next()
    } else {
      next({ name: 'errors', query: { status: 403 } })
    }
  }
}
