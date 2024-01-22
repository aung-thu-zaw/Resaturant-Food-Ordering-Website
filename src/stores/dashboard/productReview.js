import { defineStore } from 'pinia'
import { useGenerator } from '@/composables/useGenerator'

export const useProductReviewStore = defineStore('product-review', {
  state: () => ({
    data: [],
    responseErrors: null
  }),

  actions: {
    async getAllProductReviews(params) {
      try {
        const { generateQueryParams } = useGenerator()

        const apiUrl = '/api/admin/product-reviews?' + generateQueryParams({ ...params })

        this.router.push({ query: { ...params } })

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.data = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async changeStatus(productReviewId, updatedStatus) {
      try {
        const apiUrl = `/api/admin/product-reviews/${productReviewId}/change-status`

        const response = await this.$axios.put(apiUrl, { status: updatedStatus })

        if (!response) throw new Error('Response Not Found!')

        const index = this.data.data.findIndex(
          (productReview) => productReview.id === productReviewId
        )

        this.data.data[index] = { ...response.data }

        this.$swal({ icon: 'success', title: 'Product review status changed successfully!' })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'error',
          title: 'Failed to change product review status. Please try again.'
        })
      }
    },

    async deleteProductReview(productReviewId) {
      try {
        const apiUrl = `/api/admin/product-reviews/${productReviewId}`

        const response = await this.$axios.delete(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        const deletedProductReviewIndex = this.data.data.findIndex(
          (productReview) => productReview.id === productReviewId
        )

        if (deletedProductReviewIndex !== -1) {
          this.data.data.splice(deletedProductReviewIndex, 1)

          const currentPageIndex = this.data.current_page - 1
          const itemsPerPage = this.data.per_page

          if (deletedProductReviewIndex >= currentPageIndex * itemsPerPage) {
            await this.getAllProductReviews({ page: this.data.current_page })
          }
        }

        if (response.status === 204)
          this.$swal({ icon: 'success', title: 'Product review deleted successfully!' })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'error',
          title: 'Failed to delete product review. Please try again.'
        })
      }
    }
  },

  getters: {
    productReviews: (state) => state.data,
    errors: (state) => state.responseErrors
  }
})
