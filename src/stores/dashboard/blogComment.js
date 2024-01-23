import { defineStore } from 'pinia'
import { useGenerator } from '@/composables/useGenerator'

export const useBlogCommentStore = defineStore('blog-comment', {
  state: () => ({
    data: [],
    responseErrors: null
  }),

  actions: {
    async getAllBlogComments(params) {
      try {
        const { generateQueryParams } = useGenerator()

        const apiUrl = '/api/admin/blog-comments?' + generateQueryParams({ ...params })

        this.router.push({ query: { ...params } })

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.data = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async deleteBlogComment(blogCommentId) {
      try {
        const apiUrl = `/api/admin/blog-comments/${blogCommentId}`

        const response = await this.$axios.delete(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        const deletedBlogCommentIndex = this.data.data.findIndex(
          (blogComment) => blogComment.id === blogCommentId
        )

        if (deletedBlogCommentIndex !== -1) {
          this.data.data.splice(deletedBlogCommentIndex, 1)

          const currentPageIndex = this.data.current_page - 1
          const itemsPerPage = this.data.per_page

          if (deletedBlogCommentIndex >= currentPageIndex * itemsPerPage) {
            await this.getAllBlogComments({ page: this.data.current_page })
          }
        }

        if (response.status === 204)
          this.$swal({ icon: 'success', title: 'Blog comment deleted successfully!' })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'error',
          title: 'Failed to delete blog comment. Please try again.'
        })
      }
    }
  },

  getters: {
    blogComments: (state) => state.data,
    errors: (state) => state.responseErrors
  }
})
