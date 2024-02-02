import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useCartItemStore = defineStore('cart-item', {
  state: () => ({
    specificData: null,
    responseErrors: null
  }),

  actions: {
    async createCartItem(data) {
      try {
        const apiUrl = `/api/cart/cart-items`

        const response = await this.$axios.post(apiUrl, { ...data })

        if (!response) throw new Error('Response Not Found!')

        toast.success(`${data.qty} item(s) have been added to your cart`, { autoClose: 2000 })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async updateCartItem(data, cartItemId) {
      try {
        const apiUrl = `/api/cart/cart-items/${cartItemId}`

        const response = await this.$axios.patch(apiUrl, { ...data })

        if (!response) throw new Error('Response Not Found!')

        toast.success(`Item updated successfully!`, {
          autoClose: 2000
        })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async deleteCartItem(cartItemId) {
      try {
        const apiUrl = `/api/cart/cart-items/${cartItemId}`

        const response = await this.$axios.delete(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        if (response.status === 204)
          toast.success(`Item(s) have been removed from your cart`, {
            autoClose: 2000
          })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'error',
          title: 'Failed to delete cart items. Please try again.'
        })
      }
    }
  },

  getters: {
    cartItem: (state) => state.specificData,
    errors: (state) => state.responseErrors
  }
})
