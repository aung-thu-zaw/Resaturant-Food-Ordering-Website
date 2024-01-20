import { defineStore } from 'pinia'
import { useGenerator } from '@/composables/useGenerator'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    data: [],
    responseErrors: null
  }),

  actions: {
    async getAllCategories(params) {
      try {
        const { generateQueryParams } = useGenerator()

        const apiUrl = '/api/admin/categories?' + generateQueryParams({ ...params })

        this.router.push({ query: { ...params } })

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.data = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async changeStatus(categorySlug, updatedStatus) {
      try {
        const apiUrl = `/api/admin/categories/${categorySlug}/change-status`

        const response = await this.$axios.put(apiUrl, { status: updatedStatus })

        if (!response) throw new Error('Response Not Found!')

        const index = this.data.data.findIndex((category) => category.slug === categorySlug)

        this.data.data[index] = { ...response.data }

        this.$swal({ icon: 'success', title: 'Category status changed successfully!' })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'success',
          title: 'Failed to change category status. Please try again.'
        })
      }
    }
  },

  getters: {
    categories: (state) => state.data,
    errors: (state) => state.responseErrors
  }
})
