import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const usePaymentStore = defineStore('payment', {
  state: () => ({
    specificData: null,
    responseErrors: null
  }),

  actions: {
    async cashOnDelivery(totalAmount) {
      try {
        const response = await this.$axios.post('/api/payment/cash/pay', {
          total_amount: totalAmount
        })

        if (!response) throw new Error('Response Not Found!')

        this.data = response.data

        this.router.push({ name: 'home' })

        toast.success('Your order has been successfully placed.', { autoClose: 2000 })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    }
  },

  getters: {
    order: (state) => state.specificData,
    errors: (state) => state.responseErrors
  }
})
