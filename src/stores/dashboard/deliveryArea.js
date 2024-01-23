import { defineStore } from 'pinia'
import { useGenerator } from '@/composables/useGenerator'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useDeliveryAreaStore = defineStore('delivery-area', {
  state: () => ({
    data: [],
    specificData: null,
    responseErrors: null
  }),

  actions: {
    async getAllDeliveryAreas(params) {
      try {
        const { generateQueryParams } = useGenerator()

        const apiUrl = '/api/admin/delivery-areas?' + generateQueryParams({ ...params })

        this.router.push({ query: { ...params } })

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.data = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async getDeliveryArea(deliveryAreaSlug) {
      try {
        const apiUrl = `/api/admin/delivery-areas/${deliveryAreaSlug}`

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.specificData = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async createDeliveryArea(formData, createAnother) {
      try {
        const apiUrl = `/api/admin/delivery-areas`

        const response = await this.$axios.post(apiUrl, { ...formData })

        if (!response) throw new Error('Response Not Found!')

        if (!createAnother) {
          this.router.push({ name: 'admin.delivery-areas.index' })
          this.$swal({ icon: 'success', title: 'Delivery area created successfully!' })
        } else {
          toast.success('Delivery area created successfully!', { autoClose: 2000 })
        }

        this.$reset()
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async updateDeliveryArea(formData, deliveryAreaSlug) {
      try {
        const apiUrl = `/api/admin/delivery-areas/${deliveryAreaSlug}`

        const response = await this.$axios.patch(apiUrl, { ...formData })

        if (!response) throw new Error('Response Not Found!')

        this.router.push({ name: 'admin.delivery-areas.index' })
        this.$swal({ icon: 'success', title: 'Delivery area updated successfully!' })

        this.$reset()
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async deleteDeliveryArea(deliveryAreaSlug) {
      try {
        const apiUrl = `/api/admin/delivery-areas/${deliveryAreaSlug}`

        const response = await this.$axios.delete(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        const deletedDeliveryAreaIndex = this.data.data.findIndex(
          (deliveryArea) => deliveryArea.slug === deliveryAreaSlug
        )

        if (deletedDeliveryAreaIndex !== -1) {
          this.data.data.splice(deletedDeliveryAreaIndex, 1)

          const currentPageIndex = this.data.current_page - 1
          const itemsPerPage = this.data.per_page

          if (deletedDeliveryAreaIndex >= currentPageIndex * itemsPerPage) {
            await this.getAllDeliveryAreas({ page: this.data.current_page })
          }
        }

        if (response.status === 204)
          this.$swal({ icon: 'success', title: 'Delivery area deleted successfully!' })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'error',
          title: 'Failed to delete delivery area. Please try again.'
        })
      }
    }
  },

  getters: {
    deliveryAreas: (state) => state.data,
    deliveryArea: (state) => state.specificData,
    errors: (state) => state.responseErrors
  }
})
