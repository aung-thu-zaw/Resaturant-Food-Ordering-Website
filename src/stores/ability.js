import { defineStore } from 'pinia'

export const useAbility = defineStore('ability', {
  state: () => ({
    abilities: [],
    responseErrors: null
  }),

  getters: {
    permissions: (state) => state.abilities
  },

  actions: {
    async getAllAbilities() {
      try {
        const response = await this.$axios.get('/api/abilities')

        if (!response) throw new Error('Response Not Found!')

        this.abilities = response.data
      } catch (error) {
        this.authErrors = error.response?.data?.errors
      }
    }
  }
})
