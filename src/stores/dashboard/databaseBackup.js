import { defineStore } from 'pinia'
import { useGenerator } from '@/composables/useGenerator'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useDatabaseBackupStore = defineStore('database-backup', {
  state: () => ({
    data: [],
    specificData: null,
    responseErrors: null
  }),

  actions: {
    async getAllBackups(params) {
      try {
        const { generateQueryParams } = useGenerator()

        const apiUrl = '/api/admin/database-backups?' + generateQueryParams({ ...params })

        this.router.push({ query: { ...params } })

        const response = await this.$axios.get(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        this.data = response.data
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async createBackup() {
      try {
        const apiUrl = `/api/admin/database-backups`

        const response = await this.$axios.post(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        toast.success('Backup completed successfully', { autoClose: 2000 })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
      }
    },

    async downloadBackup(filename) {
      try {
        const apiUrl = `/api/admin/database-backups/${filename}/download`

        const response = await this.$axios.get(apiUrl, { responseType: 'blob' })

        if (!response) throw new Error('Response Not Found!')

        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')

        link.href = url
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'error',
          title: 'Failed to download backup file. Please try again.'
        })
      }
    },

    async deleteBackup(filename) {
      try {
        const apiUrl = `/api/admin/database-backups/${filename}`

        const response = await this.$axios.delete(apiUrl)

        if (!response) throw new Error('Response Not Found!')

        const deletedBackupIndex = this.data.backups.data.findIndex(
          (file) => file.filename === filename
        )

        if (deletedBackupIndex !== -1) {
          this.data.backups.data.splice(deletedBackupIndex, 1)

          const currentPageIndex = this.data.current_page - 1
          const itemsPerPage = this.data.per_page

          if (deletedBackupIndex >= currentPageIndex * itemsPerPage) {
            await this.getAllBackups({ page: this.data.backups.current_page })
          }
        }

        if (response.status === 204)
          this.$swal({ icon: 'success', title: 'Backup deleted successfully!' })
      } catch (error) {
        this.responseErrors = error.response?.data?.errors
        this.$swal({
          icon: 'error',
          title: error
        })
      }
    }
  },

  getters: {
    backups: (state) => state.data.backups,
    overallInformation: (state) => state.data.overallInformation,
    backup: (state) => state.specificData,
    errors: (state) => state.responseErrors
  }
})
