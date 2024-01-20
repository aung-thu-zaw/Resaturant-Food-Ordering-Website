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
          icon: 'error',
          title: 'Failed to change category status. Please try again.'
        })
      }
    },

    async deleteCategory(categorySlug) {
      try {
        const apiUrl = `/api/admin/categories/${categorySlug}`

        const response = await this.$axios.delete(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        const deletedCategoryIndex = this.data.data.findIndex(
          (category) => category.slug === categorySlug
        )

        if (deletedCategoryIndex !== -1) {
          this.data.data.splice(deletedCategoryIndex, 1)

          const currentPageIndex = this.data.current_page - 1
          const itemsPerPage = this.data.per_page

          if (deletedCategoryIndex >= currentPageIndex * itemsPerPage) {
            await this.getAllCategories({ page: this.data.current_page })
          }
        }

        if (response.status === 204)
          this.$swal({ icon: 'success', title: 'Category deleted successfully!' })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'error',
          title: 'Failed to delete category. Please try again.'
        })
      }
    }
  },

  getters: {
    categories: (state) => state.data,
    errors: (state) => state.responseErrors
  }
})
