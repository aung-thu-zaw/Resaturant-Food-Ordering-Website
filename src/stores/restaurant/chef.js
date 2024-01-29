import { defineStore } from 'pinia'

export const useChefStore = defineStore('chef', {
  state: () => ({
    data: [],
    responseErrors: null
  }),

  actions: {
    async getAllChefs() {
      try {
        const response = await this.$axios.get('/api/chefs')

        if (!response) throw new Error('Response Not Found!')

        this.data = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    }
  },

  getters: {
    chefs: (state) => state.data,
    errors: (state) => state.responseErrors
  }
})
