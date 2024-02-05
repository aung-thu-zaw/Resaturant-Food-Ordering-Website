import { defineStore } from 'pinia'
import { useGenerator } from '@/composables/useGenerator'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useOrderStore = defineStore('order', {
  state: () => ({
    data: [],
    specificData: null,
    responseErrors: null
  }),

  actions: {
    async getAllOrders(params) {
      try {
        const { generateQueryParams } = useGenerator()

        const apiUrl = '/api/admin/orders?' + generateQueryParams({ ...params })

        this.router.push({ query: { ...params } })

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.data = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async getOrder(orderUUID) {
      try {
        const apiUrl = `/api/admin/orders/${orderUUID}`

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')
        this.specificData = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async updateOrder(formData, orderUUID) {
      try {
        const apiUrl = `/api/admin/orders/${orderUUID}`

        const response = await this.$axios.patch(apiUrl, { ...formData })

        if (!response) throw new Error('Response Not Found!')

        this.specificData = response.data

        toast.success('Order updated successfully!', { autoClose: 2000 })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    }
  },

  getters: {
    orders: (state) => state.data,
    order: (state) => state.specificData,
    errors: (state) => state.responseErrors
  }
})
