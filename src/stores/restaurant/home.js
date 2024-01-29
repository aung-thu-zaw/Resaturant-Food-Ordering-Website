import { defineStore } from 'pinia'

export const useHomeStore = defineStore('home', {
  state: () => ({
    data: [],
    responseErrors: null
  }),

  actions: {
    async getAllResources() {
      try {
        const response = await this.$axios.get('/api/resources/for-home')

        if (!response) throw new Error('Response Not Found!')

        this.data = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    }
  },

  getters: {
    dailyOffers: (state) => state.data.dailyOffers,
    popularFoods: (state) => state.data.popularFoods,
    ourChefs: (state) => state.data.ourChefs,
    latestBlogs: (state) => state.data.latestBlogs,
    errors: (state) => state.responseErrors
  }
})
