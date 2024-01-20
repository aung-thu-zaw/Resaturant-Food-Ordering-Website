import { useAuthStore } from '@/stores/auth'

export default function permission(permission) {
  return async (to, from, next) => {
    const authStore = useAuthStore()

    if (!authStore.currentUser) await authStore.getAuthenticatedUser()

    if (!authStore.isAuthenticated || !authStore.currentUser?.permissions?.includes(permission)) {
      next({ name: 'errors', query: { status: 403 } })
    } else {
      next()
    }
  }
}
