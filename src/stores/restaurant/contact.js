import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useContactUsStore = defineStore('contact-us', {
  state: () => ({
    responseErrors: null
  }),

  actions: {
    async sendContactEmail(formData) {
      try {
        const response = await this.$axios.post('/api/contact/send-email', { ...formData })

        if (!response) throw new Error('Response Not Found!')

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
