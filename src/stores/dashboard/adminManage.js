import { defineStore } from 'pinia'
import { useGenerator } from '@/composables/useGenerator'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useAdminManageStore = defineStore('admin-manage', {
  state: () => ({
    data: [],
    specificData: null,
    resources: null,
    responseErrors: null
  }),

  actions: {
    async getAllAdmins(params) {
      try {
        const { generateQueryParams } = useGenerator()

        const apiUrl = '/api/admin/admin-accounts?' + generateQueryParams({ ...params })

        this.router.push({ query: { ...params } })

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.data = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async getAdmin(adminId) {
      try {
        const apiUrl = `/api/admin/admin-accounts/${adminId}`

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.specificData = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async changeStatus(adminId, updatedStatus) {
      try {
        const apiUrl = `/api/admin/admin-accounts/${adminId}/change-status`

        const response = await this.$axios.put(apiUrl, { status: updatedStatus })

        if (!response) throw new Error('Response Not Found!')

        const index = this.data.data.findIndex((admin) => admin.id === adminId)

        this.data.data[index] = { ...response.data }

        this.$swal({ icon: 'success', title: 'Admin account status changed successfully!' })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'error',
          title: 'Failed to change admin account status. Please try again.'
        })
      }
    },

    async getResources() {
      try {
        const apiUrl = `api/admin/resources/for-admin`

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.resources = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async createAdmin(formData, createAnother) {
      try {
        const apiUrl = `/api/admin/admin-accounts`

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
          this.router.push({ name: 'admin.admin-manage.index' })
          this.$swal({ icon: 'success', title: 'Admin account created successfully!' })
        } else {
          toast.success('Admin account created successfully!', { autoClose: 2000 })
        }

        this.$reset()
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async updateAdmin(formData, adminId) {
      try {
        const apiUrl = `/api/admin/admin-accounts/${adminId}`

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

        this.router.push({ name: 'admin.admin-manage.index' })
        this.$swal({ icon: 'success', title: 'Admin account updated successfully!' })

        this.$reset()
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async deleteAdmin(adminId) {
      try {
        const apiUrl = `/api/admin/admin-accounts/${adminId}`

        const response = await this.$axios.delete(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        const deletedAdminIndex = this.data.data.findIndex((admin) => admin.id === adminId)

        if (deletedAdminIndex !== -1) {
          this.data.data.splice(deletedAdminIndex, 1)

          const currentPageIndex = this.data.current_page - 1
          const itemsPerPage = this.data.per_page

          if (deletedAdminIndex >= currentPageIndex * itemsPerPage) {
            await this.getAllAdmins({ page: this.data.current_page })
          }
        }

        if (response.status === 204)
          this.$swal({ icon: 'success', title: 'Admin account deleted successfully!' })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'error',
          title: 'Failed to delete admin account. Please try again.'
        })
      }
    }
  },

  getters: {
    admins: (state) => state.data,
    admin: (state) => state.specificData,
    roles: (state) => state.resources,
    errors: (state) => state.responseErrors
  }
})
