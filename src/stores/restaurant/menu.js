import { defineStore } from 'pinia'
import { useGenerator } from '@/composables/useGenerator'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    data: [],
    resources: null,
    specificData: null,
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
    },

    async getMenu(productSlug) {
      try {
        const apiUrl = `/api/menus/${productSlug}`

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
    menus: (state) => state.data,
    menu: (state) => state.specificData?.product,
    relatedItems: (state) => state.specificData?.relatedItems,
    categories: (state) => state.resources,
    errors: (state) => state.responseErrors
  }
})
