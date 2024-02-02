import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    specificData: null,
    responseErrors: null
  }),

  actions: {
    async getCartWithCartItems() {
      try {
        const apiUrl = `/api/cart`

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.specificData = response.data
      } catch (error) {
        if (error.response.status === 404)
          this.router.push({ name: 'errors', query: { status: 404 } })

        this.responseErrors = error.response?.data?.errors
      }
    }
  },

  getters: {
    cart: (state) => state.specificData,
    errors: (state) => state.responseErrors
  }
})
