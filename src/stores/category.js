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
    }
  },

  getters: {
    categories: (state) => state.data,
    errors: (state) => state.responseErrors
  }
})
