import { defineStore } from 'pinia'
import { useGenerator } from '@/composables/useGenerator'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useShippingMethodStore = defineStore('shipping-method', {
  state: () => ({
    data: [],
    specificData: null,
    responseErrors: null
  }),

  actions: {
    async getAllShippingMethods(params) {
      try {
        const { generateQueryParams } = useGenerator()

        const apiUrl = '/api/admin/shipping-methods?' + generateQueryParams({ ...params })

        this.router.push({ query: { ...params } })

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.data = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async getShippingMethod(shippingMethodSlug) {
      try {
        const apiUrl = `/api/admin/shipping-methods/${shippingMethodSlug}`

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.specificData = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async createShippingMethod(formData, createAnother) {
      try {
        const apiUrl = `/api/admin/shipping-methods`

        const response = await this.$axios.post(apiUrl, { ...formData })

        if (!response) throw new Error('Response Not Found!')

        if (!createAnother) {
          this.router.push({ name: 'admin.shipping-methods.index' })
          this.$swal({ icon: 'success', title: 'Shipping method created successfully!' })
        } else {
          toast.success('Shipping method created successfully!', { autoClose: 2000 })
        }

        this.$reset()
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async updateShippingMethod(formData, shippingMethodSlug) {
      try {
        const apiUrl = `/api/admin/shipping-methods/${shippingMethodSlug}`

        const response = await this.$axios.patch(apiUrl, { ...formData })

        if (!response) throw new Error('Response Not Found!')

        this.router.push({ name: 'admin.shipping-methods.index' })
        this.$swal({ icon: 'success', title: 'Shipping method updated successfully!' })

        this.$reset()
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async deleteShippingMethod(shippingMethodSlug) {
      try {
        const apiUrl = `/api/admin/shipping-methods/${shippingMethodSlug}`

        const response = await this.$axios.delete(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        const deletedShippingMethodIndex = this.data.data.findIndex(
          (shippingMethod) => shippingMethod.slug === shippingMethodSlug
        )

        if (deletedShippingMethodIndex !== -1) {
          this.data.data.splice(deletedShippingMethodIndex, 1)

          const currentPageIndex = this.data.current_page - 1
          const itemsPerPage = this.data.per_page

          if (deletedShippingMethodIndex >= currentPageIndex * itemsPerPage) {
            await this.getAllShippingMethods({ page: this.data.current_page })
          }
        }

        if (response.status === 204)
          this.$swal({ icon: 'success', title: 'Shipping method deleted successfully!' })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'error',
          title: 'Failed to delete shipping method. Please try again.'
        })
      }
    }
  },

  getters: {
    shippingMethods: (state) => state.data,
    shippingMethod: (state) => state.specificData,
    errors: (state) => state.responseErrors
  }
})
