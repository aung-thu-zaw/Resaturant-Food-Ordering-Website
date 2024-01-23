import { defineStore } from 'pinia'
import { useGenerator } from '@/composables/useGenerator'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useBlogCategoryStore = defineStore('blog-category', {
  state: () => ({
    data: [],
    specificData: null,
    responseErrors: null
  }),

  actions: {
    async getAllBlogCategories(params) {
      try {
        const { generateQueryParams } = useGenerator()

        const apiUrl = '/api/admin/blog-categories?' + generateQueryParams({ ...params })

        this.router.push({ query: { ...params } })

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.data = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async getBlogCategory(blogCategorySlug) {
      try {
        const apiUrl = `/api/admin/blog-categories/${blogCategorySlug}`

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.specificData = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async createBlogCategory(formData, createAnother) {
      try {
        const apiUrl = `/api/admin/blog-categories`

        const response = await this.$axios.post(apiUrl, { ...formData })

        if (!response) throw new Error('Response Not Found!')

        if (!createAnother) {
          this.router.push({ name: 'admin.blog-categories.index' })
          this.$swal({ icon: 'success', title: 'Blog category created successfully!' })
        } else {
          toast.success('Blog category created successfully!', { autoClose: 2000 })
        }

        this.$reset()
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async updateBlogCategory(formData, blogCategorySlug) {
      try {
        const apiUrl = `/api/admin/blog-categories/${blogCategorySlug}`

        const response = await this.$axios.patch(apiUrl, { ...formData })

        if (!response) throw new Error('Response Not Found!')

        this.router.push({ name: 'admin.blog-categories.index' })
        this.$swal({ icon: 'success', title: 'Blog category updated successfully!' })

        this.$reset()
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async deleteBlogCategory(blogCategorySlug) {
      try {
        const apiUrl = `/api/admin/blog-categories/${blogCategorySlug}`

        const response = await this.$axios.delete(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        const deletedBlogCategoryIndex = this.data.data.findIndex(
          (blogCategory) => blogCategory.slug === blogCategorySlug
        )

        if (deletedBlogCategoryIndex !== -1) {
          this.data.data.splice(deletedBlogCategoryIndex, 1)

          const currentPageIndex = this.data.current_page - 1
          const itemsPerPage = this.data.per_page

          if (deletedBlogCategoryIndex >= currentPageIndex * itemsPerPage) {
            await this.getAllBlogCategories({ page: this.data.current_page })
          }
        }

        if (response.status === 204)
          this.$swal({ icon: 'success', title: 'Blog category deleted successfully!' })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'error',
          title: 'Failed to delete blog category. Please try again.'
        })
      }
    }
  },

  getters: {
    blogCategories: (state) => state.data,
    blogCategory: (state) => state.specificData,
    errors: (state) => state.responseErrors
  }
})
