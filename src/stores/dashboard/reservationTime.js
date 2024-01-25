import { defineStore } from 'pinia'
import { useGenerator } from '@/composables/useGenerator'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useReservationTimeStore = defineStore('reservation-time', {
  state: () => ({
    data: [],
    responseErrors: null
  }),

  actions: {
    async getAllReservationTimes(params) {
      try {
        const { generateQueryParams } = useGenerator()

        const apiUrl = '/api/admin/reservation-times?' + generateQueryParams({ ...params })

        this.router.push({ query: { ...params } })

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.data = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async createReservationTime(formData, createAnother) {
      try {
        const apiUrl = `/api/admin/reservation-times`

        const response = await this.$axios.post(apiUrl, { ...formData })

        if (!response) throw new Error('Response Not Found!')

        if (!createAnother) {
          this.router.push({ name: 'admin.reservation-times.index' })
          this.$swal({ icon: 'success', title: 'Reservation time created successfully!' })
        } else {
          toast.success('Reservation time created successfully!', { autoClose: 2000 })
        }

        this.$reset()
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async deleteReservationTime(reservationTimeId) {
      try {
        const apiUrl = `/api/admin/reservation-times/${reservationTimeId}`

        const response = await this.$axios.delete(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        const deletedReservationTimeIndex = this.data.data.findIndex(
          (reservationTime) => reservationTime.id === reservationTimeId
        )

        if (deletedReservationTimeIndex !== -1) {
          this.data.data.splice(deletedReservationTimeIndex, 1)

          const currentPageIndex = this.data.current_page - 1
          const itemsPerPage = this.data.per_page

          if (deletedReservationTimeIndex >= currentPageIndex * itemsPerPage) {
            await this.getAllReservationTimes({ page: this.data.current_page })
          }
        }

        if (response.status === 204)
          this.$swal({ icon: 'success', title: 'Reservation time deleted successfully!' })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'error',
          title: 'Failed to delete reservation time. Please try again.'
        })
      }
    }
  },

  getters: {
    reservationTimes: (state) => state.data,
    errors: (state) => state.responseErrors
  }
})
