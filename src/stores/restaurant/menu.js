import { defineStore } from 'pinia'
import { useGenerator } from '@/composables/useGenerator'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    data: [],
    resources: null,
    responseErrors: null
  }),

  actions: {
    async getAllMenus(params) {
      try {
        const { generateQueryParams } = useGenerator()

        const apiUrl = '/api/menus?' + generateQueryParams({ ...params })

        this.router.push({ query: { ...params } })

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.data = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async getResources() {
      try {
        const apiUrl = `api/resources/for-menu-filter`

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.resources = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    }
  },

  getters: {
    menus: (state) => state.data,
    categories: (state) => state.resources,
    errors: (state) => state.responseErrors
  }
})
