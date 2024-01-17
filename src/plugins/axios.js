import axios from 'axios'

const createAxiosInstance = (options) => {
  return axios.create({
    baseURL: options.baseURL || 'http://localhost:8000',
    withCredentials: options.withCredentials || true,
    withXSRFToken: options.withXSRFToken || true,
    headers: {
      Accept: options.headers?.accept || 'application/json',
      'Content-Type': options.headers?.contentType || 'application/json',
      'X-Requested-With': options.headers?.xRequestedWith || 'XMLHttpRequest'
    }
  })
}

export default {
  install: (app, options) => {
    const axiosInstance = createAxiosInstance(options)
    app.config.globalProperties.$axios = axiosInstance
  }
}
