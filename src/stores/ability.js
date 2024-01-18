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

        console.log(response)
      } catch (error) {
        console.log(error.response)
        this.authErrors = error.response?.data?.errors
      }
    }
  }
})
