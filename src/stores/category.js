import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    data: [],
    responseErrors: null
  }),

  actions: {
    async getAllCategories({ search, page, per_page, sort, direction }) {
      try {
        const queryParams = [
          search && `search=${search}`,
          page && `page=${page}`,
          per_page && `per_page=${per_page}`,
          sort && `sort=${sort}`,
          direction && `direction=${direction}`
        ].filter(Boolean)

        const object = queryParams.reduce((acc, item) => {
          const [key, value] = item.split('=')
          acc[key] = value
          return acc
        }, {})

        this.router.push({ query: object })

        const apiUrl =
          '/api/admin/categories' + (queryParams.length ? `?${queryParams.join('&')}` : '')

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.data = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    }
  },

  getters: {
    categories: (state) => state.data,
    errors: (state) => state.responseErrors
  }
})
