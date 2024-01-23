import { defineStore } from 'pinia'
import { useGenerator } from '@/composables/useGenerator'

export const useSubscriberStore = defineStore('subscriber', {
  state: () => ({
    data: [],
    responseErrors: null
  }),

  actions: {
    async getAllSubscribers(params) {
      try {
        const { generateQueryParams } = useGenerator()

        const apiUrl = '/api/admin/subscribers?' + generateQueryParams({ ...params })

        this.router.push({ query: { ...params } })

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.data = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async deleteSubscriber(subscriberId) {
      try {
        const apiUrl = `/api/admin/subscribers/${subscriberId}`

        const response = await this.$axios.delete(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        const deletedSubscriberIndex = this.data.data.findIndex(
          (subscriber) => subscriber.id === subscriberId
        )

        if (deletedSubscriberIndex !== -1) {
          this.data.data.splice(deletedSubscriberIndex, 1)

          const currentPageIndex = this.data.current_page - 1
          const itemsPerPage = this.data.per_page

          if (deletedSubscriberIndex >= currentPageIndex * itemsPerPage) {
            await this.getAllSubscribers({ page: this.data.current_page })
          }
        }

        if (response.status === 204)
          this.$swal({ icon: 'success', title: 'Subscriber deleted successfully!' })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'error',
          title: 'Failed to delete subscriber. Please try again.'
        })
      }
    }
  },

  getters: {
    subscribers: (state) => state.data,
    errors: (state) => state.responseErrors
  }
})
