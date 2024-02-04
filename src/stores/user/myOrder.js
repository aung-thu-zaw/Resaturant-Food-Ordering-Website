import { defineStore } from 'pinia'

export const useMyOrderStore = defineStore('my-order', {
  state: () => ({
    data: [],
    specificData: null,
    responseErrors: null
  }),

  actions: {
    async getAllOrders() {
      try {
        const apiUrl = `/api/user/my-orders`

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.data = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async cancelOrder(orderId) {
      try {
        const apiUrl = `/api/user/my-orders/${orderId}/cancel`

        const response = await this.$axios.put(apiUrl, { status: 'cancelled' })

        if (!response) throw new Error('Response Not Found!')

        this.specificData = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async downloadOrderInvoice(orderId) {
      try {
        const apiUrl = `/api/user/my-orders/${orderId}/invoice/download`

        const response = await this.$axios.get(apiUrl, {
          responseType: 'blob'
        })

        if (!response) throw new Error('Response Not Found!')

        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'invoice.pdf')
        document.body.appendChild(link)
        link.click()
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
