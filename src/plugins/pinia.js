import { markRaw } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'

export const pinia = createPinia()

pinia.use(({ store, app }) => {
  store.router = markRaw(router)
  store.$axios = app.config.globalProperties.$axios
  store.$swal = app.config.globalProperties.$swal
})
