import { defineStore } from 'pinia'
import { useGenerator } from '@/composables/useGenerator'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useMenuStockStore = defineStore('menu-stock', {
  state: () => ({
    data: [],
    resources: null,
    specificData: null,
    responseErrors: null
  }),

  actions: {
    async getAllPublishedMenu(params) {
      try {
        const { generateQueryParams } = useGenerator()

        const apiUrl = '/api/admin/menu-stocks?' + generateQueryParams({ ...params })

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
        const apiUrl = `api/admin/resources/for-stock`

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.resources = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async updateStock(formData, productSlug) {
      try {
        const apiUrl = `/api/admin/menu-stocks/${productSlug}`

        const response = await this.$axios.patch(apiUrl, { ...formData })

        if (!response) throw new Error('Response Not Found!')

        toast.success('Menu stock updated successfully!', { autoClose: 2000 })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    }
  },

  getters: {
    products: (state) => state.data,
    product: (state) => state.specificData,
    categories: (state) => state.resources,
    errors: (state) => state.responseErrors
  }
})
