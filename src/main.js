import './assets/main.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import VueApexCharts from 'vue3-apexcharts'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import AxiosPlugin from '@/plugins/axios'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

pinia.use(({ store }) => {
  store.router = markRaw(router)
  store.$axios = app.config.globalProperties.$axios
})

app.use(pinia)
app.use(router)
app.use(VueApexCharts)
app.use(AxiosPlugin, { baseUrl: 'http://localhost:8000/' })
app.component('VueDatePicker', VueDatePicker)
app.mount('#app')
