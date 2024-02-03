import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useMyAccountStore = defineStore('my-account', {
  state: () => ({
    specificData: null,
    responseErrors: null
  }),

  actions: {
    async updatePersonalInformation(formData) {
      try {
        const apiUrl = `/api/user/my-account`

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

        this.specificData = response.data

        this.$patch({ responseErrors: null })

        toast.success('Account has been successfully updated.', { autoClose: 2000 })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async deleteAccount(password) {
      try {
        const apiUrl = `/api/user/my-account`

        const response = await this.$axios.post(apiUrl, { password: password, _method: 'DELETE' })

        if (!response) throw new Error('Response Not Found!')

        return this.router.push({ name: 'home' })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        // this.$swal({
        //   icon: 'error',
        //   title: 'Failed to delete account. Please try again.'
        // })
      }
    }
  },

  getters: {
    user: (state) => state.specificData,
    errors: (state) => state.responseErrors
  }
})
