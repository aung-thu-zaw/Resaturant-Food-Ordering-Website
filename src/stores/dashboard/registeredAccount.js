import { defineStore } from 'pinia'
import { useGenerator } from '@/composables/useGenerator'

export const useRegisteredAccountStore = defineStore('registered-account', {
  state: () => ({
    data: [],
    responseErrors: null
  }),

  actions: {
    async getAllRegisteredAccounts(params) {
      try {
        const { generateQueryParams } = useGenerator()

        const apiUrl = '/api/admin/registered-accounts?' + generateQueryParams({ ...params })

        this.router.push({ query: { ...params } })

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.data = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async changeStatus(registeredAccountId, updatedStatus) {
      try {
        const apiUrl = `/api/admin/registered-accounts/${registeredAccountId}/change-status`

        const response = await this.$axios.put(apiUrl, { status: updatedStatus })

        if (!response) throw new Error('Response Not Found!')

        const index = this.data.data.findIndex(
          (registeredAccount) => registeredAccount.id === registeredAccountId
        )

        this.data.data[index] = { ...response.data }

        this.$swal({ icon: 'success', title: 'Account status changed successfully!' })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'error',
          title: 'Failed to change account status. Please try again.'
        })
      }
    },

    async deleteRegisteredAccount(registeredAccountId) {
      try {
        const apiUrl = `/api/admin/registered-accounts/${registeredAccountId}`

        const response = await this.$axios.delete(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        console.log(response)

        const deletedRegisteredAccountIndex = this.data.data.findIndex(
          (registeredAccount) => registeredAccount.id === registeredAccountId
        )

        if (deletedRegisteredAccountIndex !== -1) {
          this.data.data.splice(deletedRegisteredAccountIndex, 1)

          const currentPageIndex = this.data.current_page - 1
          const itemsPerPage = this.data.per_page

          if (deletedRegisteredAccountIndex >= currentPageIndex * itemsPerPage) {
            await this.getAllRegisteredAccounts({ page: this.data.current_page })
          }
        }

        if (response.status === 204)
          this.$swal({ icon: 'success', title: 'Account deleted successfully!' })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'error',
          title: 'Failed to delete account. Please try again.'
        })
      }
    }
  },

  getters: {
    registeredAccounts: (state) => state.data,
    errors: (state) => state.responseErrors
  }
})
