import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    data: [],
    specificData: null,
    responseErrors: null
  }),

  actions: {
    async getAllWishlists() {
      try {
        const apiUrl = `/api/wishlists`

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.data = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async createWishlist(data) {
      try {
        const apiUrl = `/api/wishlists`

        const response = await this.$axios.post(apiUrl, { ...data })

        if (!response) throw new Error('Response Not Found!')

        toast.success(`Item is saved to the wishlist.`, { autoClose: 3000 })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async deleteWishlist(wishlistId) {
      try {
        const apiUrl = `/api/wishlists/${wishlistId}`

        const response = await this.$axios.delete(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        if (response.status === 204)
          toast.success(`Item has been removed from your wishlist`, {
            autoClose: 2000
          })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'error',
          title: 'Failed to remove wishlist. Please try again.'
        })
      }
    }
  },

  getters: {
    wishlists: (state) => state.data,
    wishlist: (state) => state.specificData,
    errors: (state) => state.responseErrors
  }
})
