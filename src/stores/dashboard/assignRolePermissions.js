import { defineStore } from 'pinia'
import { useGenerator } from '@/composables/useGenerator'

export const useAssignRolePermissionStore = defineStore('assign-role-permissions', {
  state: () => ({
    data: [],
    resources: null,
    specificData: null,
    responseErrors: null
  }),

  actions: {
    async getAllAssignRolePermissions(params) {
      try {
        const { generateQueryParams } = useGenerator()

        const apiUrl = '/api/admin/assign-role-permissions?' + generateQueryParams({ ...params })

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
        const apiUrl = `/api/admin/assign-role-permissions/${roleId}`

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.specificData = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async getResources() {
      try {
        const apiUrl = `api/admin/resources/for-assign-role-permissions`

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.resources = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async updateAssignRolePermission(formData, adminId) {
      try {
        const apiUrl = `/api/admin/assign-role-permissions/${adminId}`

        const response = await this.$axios.patch(apiUrl, { ...formData })

        if (!response) throw new Error('Response Not Found!')

        this.router.push({ name: 'admin.assign-role-permissions.index' })
        this.$swal({ icon: 'success', title: 'Assign role updated successfully!' })

        this.$reset()
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async deleteAdmin(adminId) {
      try {
        const apiUrl = `/api/admin/assign-role-permissions/${adminId}`

        const response = await this.$axios.delete(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        const deletedAdminIndex = this.data.data.findIndex((admin) => admin.id === adminId)

        if (deletedAdminIndex !== -1) {
          this.data.data.splice(deletedAdminIndex, 1)

          const currentPageIndex = this.data.current_page - 1
          const itemsPerPage = this.data.per_page

          if (deletedAdminIndex >= currentPageIndex * itemsPerPage) {
            await this.getAllAssignRolePermissions({ page: this.data.current_page })
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
    rolesWithPermissions: (state) => state.data,
    permissionGroups: (state) => state.resources.permissionGroups,
    permissions: (state) => state.resources.permissions,
    role: (state) => state.specificData,
    errors: (state) => state.responseErrors
  }
})
