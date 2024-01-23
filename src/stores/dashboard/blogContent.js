import { defineStore } from 'pinia'
import { useGenerator } from '@/composables/useGenerator'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useBlogContentStore = defineStore('blog-content', {
  state: () => ({
    data: [],
    specificData: null,
    resources: null,
    responseErrors: null
  }),

  actions: {
    async getAllBlogContents(params) {
      try {
        const { generateQueryParams } = useGenerator()

        const apiUrl = '/api/admin/blog-contents?' + generateQueryParams({ ...params })

        this.router.push({ query: { ...params } })

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.data = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async getBlogContent(blogContentSlug) {
      try {
        const apiUrl = `/api/admin/blog-contents/${blogContentSlug}`

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.specificData = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async getResources() {
      try {
        const apiUrl = `api/admin/resources/for-blog-content`

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.resources = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async changeStatus(blogContentSlug, updatedStatus) {
      try {
        const apiUrl = `/api/admin/blog-contents/${blogContentSlug}/change-status`

        const response = await this.$axios.put(apiUrl, { status: updatedStatus })

        if (!response) throw new Error('Response Not Found!')

        const index = this.data.data.findIndex((product) => product.slug === blogContentSlug)

        this.data.data[index] = { ...response.data }

        this.$swal({ icon: 'success', title: 'Blog content status changed successfully!' })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'error',
          title: 'Failed to change blog content status. Please try again.'
        })
      }
    },

    async createBlogContent(formData, createAnother) {
      try {
        const apiUrl = `/api/admin/blog-contents`

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

        if (!createAnother) {
          this.router.push({ name: 'admin.blog-contents.index' })
          this.$swal({ icon: 'success', title: 'Blog content created successfully!' })
        } else {
          toast.success('Blog content created successfully!', { autoClose: 2000 })
        }

        this.$reset()
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async updateBlogContent(formData, blogContentSlug) {
      try {
        const apiUrl = `/api/admin/blog-contents/${blogContentSlug}`

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

        this.router.push({ name: 'admin.blog-contents.index' })
        this.$swal({ icon: 'success', title: 'Blog content updated successfully!' })

        this.$reset()
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async deleteBlogContent(blogContentSlug) {
      try {
        const apiUrl = `/api/admin/blog-contents/${blogContentSlug}`

        const response = await this.$axios.delete(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        const deletedBlogContentIndex = this.data.data.findIndex(
          (blogContent) => blogContent.slug === blogContentSlug
        )

        if (deletedBlogContentIndex !== -1) {
          this.data.data.splice(deletedBlogContentIndex, 1)

          const currentPageIndex = this.data.current_page - 1
          const itemsPerPage = this.data.per_page

          if (deletedBlogContentIndex >= currentPageIndex * itemsPerPage) {
            await this.getAllBlogContents({ page: this.data.current_page })
          }
        }

        if (response.status === 204)
          this.$swal({ icon: 'success', title: 'Blog content deleted successfully!' })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'error',
          title: 'Failed to delete blog content. Please try again.'
        })
      }
    }
  },

  getters: {
    blogContents: (state) => state.data,
    blogCategories: (state) => state.resources,
    blogContent: (state) => state.specificData,
    errors: (state) => state.responseErrors
  }
})
