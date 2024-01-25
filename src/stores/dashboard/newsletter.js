import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useNewsletterStore = defineStore('newsletter', {
  state: () => ({
    responseErrors: null
  }),

  actions: {
    async sendNewsletter(formData) {
      try {
        const response = await this.$axios.post('/api/admin/send-newsletter', { ...formData })

        if (!response) throw new Error('Response Not Found!')

        console.log(response)
        toast.success(response.data.message, { autoClose: 2000 })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    }
  },

  getters: {
    errors: (state) => state.responseErrors
  }
})
