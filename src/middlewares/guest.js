import { useAuthStore } from '@/stores/auth'

export default async function guest(to, from, next) {
  const authStore = useAuthStore()

  await authStore.getAuthenticatedUser()

  if (authStore.isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
}
