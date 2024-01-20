import { useAuthStore } from '@/stores/auth'

export default async function auth(to, from, next) {
  const authStore = useAuthStore()

  if (!authStore.currentUser) await authStore.getAuthenticatedUser()

  if (!authStore.isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
}
