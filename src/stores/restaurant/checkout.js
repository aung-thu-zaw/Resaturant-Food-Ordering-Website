import { defineStore } from 'pinia'

export const useCheckoutStore = defineStore('checkout', {
  state: () => ({
    resources: null,
    responseErrors: null,
    information: null
  }),

  actions: {
    async getResources() {
      try {
        const apiUrl = `api/resources/for-checkout`

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.resources = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async getCheckoutInformation() {
      try {
        const apiUrl = `api/checkout/get-information`

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.information = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async storeCheckoutInformation(formData) {
      try {
        const apiUrl = `api/checkout/store-information`

        const response = await this.$axios.post(apiUrl, { ...formData })

        if (!response) throw new Error('Response Not Found!')

        this.information = response.data

        this.router.push({ name: 'payments', query: { tab: 'paypal' } })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    }
  },

  getters: {
    shippingMethods: (state) => state.resources?.shippingMethods,
    deliveryAreas: (state) => state.resources?.deliveryAreas,
    checkoutInformation: (state) => state.information,
    errors: (state) => state.responseErrors
  }
})
