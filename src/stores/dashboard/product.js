import { defineStore } from 'pinia'
import { useGenerator } from '@/composables/useGenerator'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useProductStore = defineStore('product', {
  state: () => ({
    data: [],
    specificData: null,
    resources: null,
    responseErrors: null
  }),

  actions: {
    async getAllProducts(params) {
      try {
        const { generateQueryParams } = useGenerator()

        const apiUrl = '/api/admin/products?' + generateQueryParams({ ...params })

        this.router.push({ query: { ...params } })

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.data = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async getProduct(productSlug) {
      try {
        const apiUrl = `/api/admin/products/${productSlug}`

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.specificData = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async getResources() {
      try {
        const apiUrl = `api/admin/resources/for-product`

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.resources = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async changeStatus(productSlug, updatedStatus) {
      try {
        const apiUrl = `/api/admin/products/${productSlug}/change-status`

        const response = await this.$axios.put(apiUrl, { status: updatedStatus })

        if (!response) throw new Error('Response Not Found!')

        const index = this.data.data.findIndex((product) => product.slug === productSlug)

        this.data.data[index] = { ...response.data }

        this.$swal({ icon: 'success', title: 'Product status changed successfully!' })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'error',
          title: 'Failed to change product status. Please try again.'
        })
      }
    },

    async createProduct(formData, createAnother) {
      try {
        const apiUrl = `/api/admin/products`

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
          this.router.push({ name: 'admin.products.index' })
          this.$swal({ icon: 'success', title: 'Product created successfully!' })
        } else {
          toast.success('Product created successfully!', { autoClose: 2000 })
        }

        this.$reset()
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async updateProduct(formData, productSlug) {
      try {
        const apiUrl = `/api/admin/products/${productSlug}`

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

        this.router.push({ name: 'admin.products.index' })
        this.$swal({ icon: 'success', title: 'Product updated successfully!' })

        this.$reset()
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async deleteProduct(productSlug) {
      try {
        const apiUrl = `/api/admin/products/${productSlug}`

        const response = await this.$axios.delete(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        const deletedProductIndex = this.data.data.findIndex(
          (product) => product.slug === productSlug
        )

        if (deletedProductIndex !== -1) {
          this.data.data.splice(deletedProductIndex, 1)

          const currentPageIndex = this.data.current_page - 1
          const itemsPerPage = this.data.per_page

          if (deletedProductIndex >= currentPageIndex * itemsPerPage) {
            await this.getAllProducts({ page: this.data.current_page })
          }
        }

        if (response.status === 204)
          this.$swal({ icon: 'success', title: 'Product deleted successfully!' })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'error',
          title: 'Failed to delete product. Please try again.'
        })
      }
    },

    async deleteAdditionalImage(additionalImageId) {
      try {
        const apiUrl = `/api/admin/products/additional-images/${additionalImageId}`

        const response = await this.$axios.delete(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        if (response.status === 204)
          toast.success('Additional Image deleted successfully!', { autoClose: 2000 })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'error',
          title: 'Failed to delete product additional image. Please try again.'
        })
      }
    }
  },

  getters: {
    products: (state) => state.data,
    categories: (state) => state.resources,
    product: (state) => state.specificData,
    errors: (state) => state.responseErrors
  }
})
