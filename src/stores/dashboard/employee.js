import { defineStore } from 'pinia'
import { useGenerator } from '@/composables/useGenerator'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    data: [],
    specificData: null,
    resources: null,
    responseErrors: null
  }),

  actions: {
    async getAllEmployees(params) {
      try {
        const { generateQueryParams } = useGenerator()

        const apiUrl = '/api/admin/employees?' + generateQueryParams({ ...params })

        this.router.push({ query: { ...params } })

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.data = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async getEmployee(employeeId) {
      try {
        const apiUrl = `/api/admin/employees/${employeeId}`

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.specificData = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async changeStatus(employeeId, updatedStatus) {
      try {
        const apiUrl = `/api/admin/employees/${employeeId}/change-status`

        const response = await this.$axios.put(apiUrl, { status: updatedStatus })

        if (!response) throw new Error('Response Not Found!')

        const index = this.data.data.findIndex((employee) => employee.id === employeeId)

        this.data.data[index] = { ...response.data }

        this.$swal({ icon: 'success', title: 'Employee status changed successfully!' })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'error',
          title: 'Failed to change employee status. Please try again.'
        })
      }
    },

    async getResources() {
      try {
        const apiUrl = `api/admin/resources/for-employee`

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.resources = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async createEmployee(formData, createAnother) {
      try {
        const apiUrl = `/api/admin/employees`

        const response = await this.$axios.post(
          apiUrl,
          { ...formData },
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )

        if (!response) throw new Error('Response Not Found!')

        if (!createAnother) {
          this.router.push({ name: 'admin.employees.index' })
          this.$swal({ icon: 'success', title: 'Employee created successfully!' })
        } else {
          toast.success('Employee created successfully!', { autoClose: 2000 })
        }

        this.$reset()
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async updateEmployee(formData, employeeId) {
      try {
        const apiUrl = `/api/admin/employees/${employeeId}`

        formData._method = 'PATCH'

        const response = await this.$axios.post(
          apiUrl,
          { ...formData },
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )

        if (!response) throw new Error('Response Not Found!')

        this.router.push({ name: 'admin.employees.index' })
        this.$swal({ icon: 'success', title: 'Employee updated successfully!' })

        this.$reset()
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async deleteEmployee(employeeId) {
      try {
        const apiUrl = `/api/admin/employees/${employeeId}`

        const response = await this.$axios.delete(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        const deletedEmployeeIndex = this.data.data.findIndex(
          (employee) => employee.id === employeeId
        )

        if (deletedEmployeeIndex !== -1) {
          this.data.data.splice(deletedEmployeeIndex, 1)

          const currentPageIndex = this.data.current_page - 1
          const itemsPerPage = this.data.per_page

          if (deletedEmployeeIndex >= currentPageIndex * itemsPerPage) {
            await this.getAllEmployees({ page: this.data.current_page })
          }
        }

        if (response.status === 204)
          this.$swal({ icon: 'success', title: 'Employee deleted successfully!' })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'error',
          title: 'Failed to delete employee. Please try again.'
        })
      }
    }
  },

  getters: {
    employees: (state) => state.data,
    employee: (state) => state.specificData,
    employeePositions: (state) => state.resources,
    errors: (state) => state.responseErrors
  }
})
