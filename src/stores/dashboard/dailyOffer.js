import { defineStore } from 'pinia'
import { useGenerator } from '@/composables/useGenerator'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useDailyOfferStore = defineStore('daily-offer', {
  state: () => ({
    data: [],
    specificData: null,
    resources: null,
    responseErrors: null
  }),

  actions: {
    async getAllDailyOffers(params) {
      try {
        const { generateQueryParams } = useGenerator()

        const apiUrl = '/api/admin/daily-offers?' + generateQueryParams({ ...params })

        this.router.push({ query: { ...params } })

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.data = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async getDailyOffer(dailyOfferId) {
      try {
        const apiUrl = `/api/admin/daily-offers/${dailyOfferId}`

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.specificData = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async getResources() {
      try {
        const apiUrl = `api/admin/resources/for-daily-offer`

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.resources = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async createDailyOffer(formData, createAnother) {
      try {
        const apiUrl = `/api/admin/daily-offers`

        const response = await this.$axios.post(apiUrl, { ...formData })

        if (!response) throw new Error('Response Not Found!')

        if (!createAnother) {
          this.router.push({ name: 'admin.daily-offers.index' })
          this.$swal({ icon: 'success', title: 'Daily offer created successfully!' })
        } else {
          toast.success('Daily offer created successfully!', { autoClose: 2000 })
        }

        this.$reset()
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async updateDailyOffer(formData, dailyOfferId) {
      try {
        const apiUrl = `/api/admin/daily-offers/${dailyOfferId}`

        const response = await this.$axios.patch(apiUrl, { ...formData })

        if (!response) throw new Error('Response Not Found!')

        this.router.push({ name: 'admin.daily-offers.index' })
        this.$swal({ icon: 'success', title: 'Daily offer updated successfully!' })

        this.$reset()
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async deleteDailyOffer(dailyOfferId) {
      try {
        const apiUrl = `/api/admin/daily-offers/${dailyOfferId}`

        const response = await this.$axios.delete(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        const deletedDailyOfferIndex = this.data.data.findIndex(
          (dailyOffer) => dailyOffer.id === dailyOfferId
        )

        if (deletedDailyOfferIndex !== -1) {
          this.data.data.splice(deletedDailyOfferIndex, 1)

          const currentPageIndex = this.data.current_page - 1
          const itemsPerPage = this.data.per_page

          if (deletedDailyOfferIndex >= currentPageIndex * itemsPerPage) {
            await this.getAllDailyOffers({ page: this.data.current_page })
          }
        }

        if (response.status === 204)
          this.$swal({ icon: 'success', title: 'Daily offer deleted successfully!' })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'error',
          title: 'Failed to delete daily offer. Please try again.'
        })
      }
    }
  },

  getters: {
    dailyOffers: (state) => state.data,
    dailyOffer: (state) => state.specificData,
    products: (state) => state.resources,
    errors: (state) => state.responseErrors
  }
})
