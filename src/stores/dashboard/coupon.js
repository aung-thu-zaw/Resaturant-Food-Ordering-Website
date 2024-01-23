import { defineStore } from 'pinia'
import { useGenerator } from '@/composables/useGenerator'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useCouponStore = defineStore('coupon', {
  state: () => ({
    data: [],
    specificData: null,
    responseErrors: null
  }),

  actions: {
    async getAllCoupons(params) {
      try {
        const { generateQueryParams } = useGenerator()

        const apiUrl = '/api/admin/coupons?' + generateQueryParams({ ...params })

        this.router.push({ query: { ...params } })

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.data = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async getCoupon(couponSlug) {
      try {
        const apiUrl = `/api/admin/coupons/${couponSlug}`

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.specificData = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async changeStatus(couponSlug, updatedStatus) {
      try {
        const apiUrl = `/api/admin/coupons/${couponSlug}/change-status`

        const response = await this.$axios.put(apiUrl, { status: updatedStatus })

        if (!response) throw new Error('Response Not Found!')

        const index = this.data.data.findIndex((coupon) => coupon.slug === couponSlug)

        this.data.data[index] = { ...response.data }

        this.$swal({ icon: 'success', title: 'Coupon status changed successfully!' })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'error',
          title: 'Failed to change coupon status. Please try again.'
        })
      }
    },

    async createCategory(formData, createAnother) {
      try {
        const apiUrl = `/api/admin/coupons`

        const response = await this.$axios.post(apiUrl, { ...formData })

        if (!response) throw new Error('Response Not Found!')

        if (!createAnother) {
          this.router.push({ name: 'admin.coupons.index' })
          this.$swal({ icon: 'success', title: 'Coupon created successfully!' })
        } else {
          toast.success('Coupon created successfully!', { autoClose: 2000 })
        }

        this.$reset()
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async updateCategory(formData, couponSlug) {
      try {
        const apiUrl = `/api/admin/coupons/${couponSlug}`

        const response = await this.$axios.patch(apiUrl, { ...formData })

        if (!response) throw new Error('Response Not Found!')

        this.router.push({ name: 'admin.coupons.index' })
        this.$swal({ icon: 'success', title: 'Coupon updated successfully!' })

        this.$reset()
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async deleteCategory(couponSlug) {
      try {
        const apiUrl = `/api/admin/coupons/${couponSlug}`

        const response = await this.$axios.delete(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        const deletedCouponIndex = this.data.data.findIndex((coupon) => coupon.slug === couponSlug)

        if (deletedCouponIndex !== -1) {
          this.data.data.splice(deletedCouponIndex, 1)

          const currentPageIndex = this.data.current_page - 1
          const itemsPerPage = this.data.per_page

          if (deletedCouponIndex >= currentPageIndex * itemsPerPage) {
            await this.getAllCoupons({ page: this.data.current_page })
          }
        }

        if (response.status === 204)
          this.$swal({ icon: 'success', title: 'Coupon deleted successfully!' })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'error',
          title: 'Failed to delete coupon. Please try again.'
        })
      }
    }
  },

  getters: {
    coupons: (state) => state.data,
    coupon: (state) => state.specificData,
    errors: (state) => state.responseErrors
  }
})
