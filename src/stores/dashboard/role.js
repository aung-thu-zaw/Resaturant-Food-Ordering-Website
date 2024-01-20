import { defineStore } from 'pinia'
import { useGenerator } from '@/composables/useGenerator'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useRoleStore = defineStore('role', {
  state: () => ({
    data: [],
    specificData: null,
    responseErrors: null
  }),

  actions: {
    async getAllRoles(params) {
      try {
        const { generateQueryParams } = useGenerator()

        const apiUrl = '/api/admin/roles?' + generateQueryParams({ ...params })

        this.router.push({ query: { ...params } })

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.data = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async getRole(roleId) {
      try {
        const apiUrl = `/api/admin/roles/${roleId}`

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.specificData = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async createRole(formData, createAnother) {
      try {
        const apiUrl = `/api/admin/roles`

        const response = await this.$axios.post(apiUrl, { ...formData })

        if (!response) throw new Error('Response Not Found!')

        if (!createAnother) {
          this.router.push({ name: 'admin.roles.index' })
          this.$swal({ icon: 'success', title: 'Role created successfully!' })
        } else {
          toast.success('Role created successfully!', { autoClose: 2000 })
        }

        this.$reset()
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async updateRole(formData, roleId) {
      try {
        const apiUrl = `/api/admin/roles/${roleId}`

        const response = await this.$axios.patch(apiUrl, { ...formData })

        if (!response) throw new Error('Response Not Found!')

        this.router.push({ name: 'admin.roles.index' })
        this.$swal({ icon: 'success', title: 'Role updated successfully!' })

        this.$reset()
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async deleteRole(roleId) {
      try {
        const apiUrl = `/api/admin/roles/${roleId}`

        const response = await this.$axios.delete(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        const deletedRoleIndex = this.data.data.findIndex((role) => role.id === roleId)

        if (deletedRoleIndex !== -1) {
          this.data.data.splice(deletedRoleIndex, 1)

          const currentPageIndex = this.data.current_page - 1
          const itemsPerPage = this.data.per_page

          if (deletedRoleIndex >= currentPageIndex * itemsPerPage) {
            await this.getAllRoles({ page: this.data.current_page })
          }
        }

        if (response.status === 204)
          this.$swal({ icon: 'success', title: 'Role deleted successfully!' })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'error',
          title: 'Failed to delete role. Please try again.'
        })
      }
    }
  },

  getters: {
    roles: (state) => state.data,
    role: (state) => state.specificData,
    errors: (state) => state.responseErrors
  }
})
