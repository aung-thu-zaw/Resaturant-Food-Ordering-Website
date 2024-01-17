import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoggedIn: false,
    authErrors: null,
    authMessage: '',
    authStatus: null
  }),

  getters: {
    currentUser: (state) => state.user,
    isAuthenticated: (state) => state.isLoggedIn,
    errors: (state) => state.authErrors,
    message: (state) => state.authMessage,
    status: (state) => state.authStatus
  },

  actions: {
    async getCsrfCookie() {
      try {
        await this.$axios.get('sanctum/csrf-cookie')
      } catch (error) {
        console.error('Failed to get CSRF cookie:', error)
      }
    },

    async forgotPassword(email) {
      try {
        await this.getCsrfCookie()

        const response = await this.$axios.post('/forgot-password', { email })

        if (!response) throw new Error('Response Not Found!')

        this.authStatus = response.data.status
      } catch (error) {
        if (error.response.status === 422) {
          this.authErrors = error.response?.data?.errors
        }
      }
    },

    async resetPassword(resetData) {
      try {
        const response = await this.$axios.post('/reset-password', resetData)

        if (!response) throw new Error('Response Not Found!')

        this.authStatus = response.data.status
      } catch (error) {
        if (error.response.status === 422) {
          this.authErrors = error.response?.data?.errors
        }
      }
    },

    async getAuthenticatedUser() {
      try {
        await this.getCsrfCookie()
        const { data } = await this.$axios.get('api/user')
        this.user = data
        this.isLoggedIn = true
      } catch (error) {
        console.error('Failed to get authenticated user:', error)
      }
    },

    async performAuthAction(action, endpoint, data) {
      try {
        await this.getCsrfCookie()

        const response = await this.$axios[action](endpoint, data)

        if (!response) throw new Error('Response Not Found!')

        this.authMessage = response?.data?.message

        this.router.push({ name: 'home' })
      } catch (error) {
        console.error('Authentication action failed:', error)
        this.authErrors = error.response?.data?.errors
      }
    },

    async register({ name, email, password, password_confirmation }) {
      await this.performAuthAction('post', '/register', {
        name,
        email,
        password,
        password_confirmation
      })
    },

    async login({ email, password }) {
      await this.performAuthAction('post', '/login', { email, password })
    },

    async logout() {
      await this.performAuthAction('post', '/logout')
      this.user = null
      this.isLoggedIn = false
    }
  }
})
