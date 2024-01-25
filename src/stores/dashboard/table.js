import { defineStore } from 'pinia'
import { useGenerator } from '@/composables/useGenerator'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useTableStore = defineStore('table', {
  state: () => ({
    data: [],
    specificData: null,
    responseErrors: null
  }),

  actions: {
    async getAllTables(params) {
      try {
        const { generateQueryParams } = useGenerator()

        const apiUrl = '/api/admin/tables?' + generateQueryParams({ ...params })

        this.router.push({ query: { ...params } })

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.data = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async getTable(tableSlug) {
      try {
        const apiUrl = `/api/admin/tables/${tableSlug}`

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.specificData = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async createTable(formData, createAnother) {
      try {
        const apiUrl = `/api/admin/tables`

        const response = await this.$axios.post(apiUrl, { ...formData })

        if (!response) throw new Error('Response Not Found!')

        if (!createAnother) {
          this.router.push({ name: 'admin.tables.index' })
          this.$swal({ icon: 'success', title: 'Table created successfully!' })
        } else {
          toast.success('Table created successfully!', { autoClose: 2000 })
        }

        this.$reset()
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async updateTable(formData, tableSlug) {
      try {
        const apiUrl = `/api/admin/tables/${tableSlug}`

        const response = await this.$axios.patch(apiUrl, { ...formData })

        if (!response) throw new Error('Response Not Found!')

        this.router.push({ name: 'admin.tables.index' })
        this.$swal({ icon: 'success', title: 'Table updated successfully!' })

        this.$reset()
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async deleteTable(tableSlug) {
      try {
        const apiUrl = `/api/admin/tables/${tableSlug}`

        const response = await this.$axios.delete(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        const deletedTableIndex = this.data.data.findIndex((table) => table.slug === tableSlug)

        if (deletedTableIndex !== -1) {
          this.data.data.splice(deletedTableIndex, 1)

          const currentPageIndex = this.data.current_page - 1
          const itemsPerPage = this.data.per_page

          if (deletedTableIndex >= currentPageIndex * itemsPerPage) {
            await this.getAllTables({ page: this.data.current_page })
          }
        }

        if (response.status === 204)
          this.$swal({ icon: 'success', title: 'Table deleted successfully!' })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'error',
          title: 'Failed to delete table. Please try again.',
          text: 'This table cannot be deleted because it still contains reservations.'
        })
      }
    }
  },

  getters: {
    tables: (state) => state.data,
    table: (state) => state.specificData,
    errors: (state) => state.responseErrors
  }
})
