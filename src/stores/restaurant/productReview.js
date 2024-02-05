import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useProductReviewStore = defineStore('product-review', {
  state: () => ({
    specificData: null,
    responseErrors: null
  }),

  actions: {
    async createProductReview(productSlug, formData) {
      try {
        const apiUrl = `/api/products/${productSlug}/reviews`

        const response = await this.$axios.post(apiUrl, { ...formData })

        if (!response) throw new Error('Response Not Found!')

        this.specificData = response.data

        toast.success('Your review is submitted successfully', { autoClose: 2000 })

        return response
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async createReply(productSlug, reviewId, reply) {
      try {
        const apiUrl = `/api/products/${productSlug}/reviews/${reviewId}/responses`

        const response = await this.$axios.post(apiUrl, { reply })

        if (!response) throw new Error('Response Not Found!')

        // console.log('This is a new reply', response.data)
        // this.data = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    }
  },

  getters: {
    productReview: (state) => state.specificData,
    errors: (state) => state.responseErrors
  }
})
