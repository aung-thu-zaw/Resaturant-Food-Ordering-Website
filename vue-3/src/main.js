import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApexCharts from 'vue3-apexcharts'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VueApexCharts)
app.component('VueDatePicker', VueDatePicker)
app.mount('#app')
