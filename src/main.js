import '@/assets/main.css'

import { createApp } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import AxiosPlugin from '@/plugins/axios'
import { Can } from '@/plugins/can'
import { pinia } from '@/plugins/pinia'

import App from '@/App.vue'
import router from '@/router'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VueSweetalert2)
app.use(VueApexCharts)
app.use(AxiosPlugin, { baseUrl: 'http://localhost:8000/' })
app.use(Can)
app.component('VueDatePicker', VueDatePicker)
app.mount('#app')
