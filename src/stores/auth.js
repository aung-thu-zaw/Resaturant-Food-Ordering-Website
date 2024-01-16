import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isLoggedIn: false
  }),
  getters: {
    currentUser: (state) => state.user
  },
  actions: {}
})
