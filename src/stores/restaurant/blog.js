import { defineStore } from 'pinia'
import { useGenerator } from '@/composables/useGenerator'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    data: [],
    specificData: null,
    resources: null,
    responseErrors: null
  }),

  actions: {
    async getAllBlogs(params) {
      try {
        const { generateQueryParams } = useGenerator()

        const apiUrl = '/api/blogs?' + generateQueryParams({ ...params })

        this.router.push({ query: { ...params } })

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.data = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async getResources() {
      try {
        const apiUrl = `api/resources/for-blog-page`

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.resources = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async getBlog(blogContentSlug) {
      try {
        const apiUrl = `/api/blogs/${blogContentSlug}`

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.specificData = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    }
  },

  getters: {
    blogs: (state) => state.data,
    blog: (state) => state.specificData?.blog,
    relatedBlogs: (state) => state.specificData?.relatedBlogs,
    comments: (state) => state.specificData?.comments,
    categories: (state) => state.resources?.categories,
    tags: (state) => state.resources?.tags,
    errors: (state) => state.responseErrors
  }
})
