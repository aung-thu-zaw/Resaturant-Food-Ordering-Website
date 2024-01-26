import { defineStore } from 'pinia'
import { useGenerator } from '@/composables/useGenerator'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useEmployeePositionStore = defineStore('employee-position', {
  state: () => ({
    data: [],
    specificData: null,
    responseErrors: null
  }),

  actions: {
    async getAllEmployeePositions(params) {
      try {
        const { generateQueryParams } = useGenerator()

        const apiUrl = '/api/admin/employee-positions?' + generateQueryParams({ ...params })

        this.router.push({ query: { ...params } })

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.data = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async getEmployeePosition(positionSlug) {
      try {
        const apiUrl = `/api/admin/employee-positions/${positionSlug}`

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.specificData = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async createEmployeePosition(formData, createAnother) {
      try {
        const apiUrl = `/api/admin/employee-positions`

        const response = await this.$axios.post(apiUrl, { ...formData })

        if (!response) throw new Error('Response Not Found!')

        if (!createAnother) {
          this.router.push({ name: 'admin.employee-positions.index' })
          this.$swal({ icon: 'success', title: 'Employee position created successfully!' })
        } else {
          toast.success('Employee position created successfully!', { autoClose: 2000 })
        }

        this.$reset()
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async updateEmployeePosition(formData, positionSlug) {
      try {
        const apiUrl = `/api/admin/employee-positions/${positionSlug}`

        const response = await this.$axios.patch(apiUrl, { ...formData })

        if (!response) throw new Error('Response Not Found!')

        this.router.push({ name: 'admin.employee-positions.index' })
        this.$swal({ icon: 'success', title: 'Employee position updated successfully!' })

        this.$reset()
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async deleteEmployeePosition(positionSlug) {
      try {
        const apiUrl = `/api/admin/employee-positions/${positionSlug}`

        const response = await this.$axios.delete(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        const deletedPositionIndex = this.data.data.findIndex(
          (position) => position.slug === positionSlug
        )

        if (deletedPositionIndex !== -1) {
          this.data.data.splice(deletedPositionIndex, 1)

          const currentPageIndex = this.data.current_page - 1
          const itemsPerPage = this.data.per_page

          if (deletedPositionIndex >= currentPageIndex * itemsPerPage) {
            await this.getAllEmployeePositions({ page: this.data.current_page })
          }
        }

        if (response.status === 204)
          this.$swal({ icon: 'success', title: 'Employee position deleted successfully!' })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'error',
          title: 'Failed to delete position. Please try again.'
        })
      }
    }
  },

  getters: {
    employeePositions: (state) => state.data,
    employeePosition: (state) => state.specificData,
    errors: (state) => state.responseErrors
  }
})
