import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: process.env.VUE_APP_API,
  timeout: 120000,
  headers: {
    Authorization: localStorage.getItem('token') || window.location.search.split('=')[1],
  },
})

axiosIns.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // eslint-disable-next-line no-console
      console.error('You are not authorized')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('userData')
      window.location.href = '/login-page'
      // window.location.replace(process.env.VUE_APP_BACKOFFICE_MAIN === window.location.href ? process.env.VUE_APP_FRONT_MAIN : process.env.VUE_APP_FRONT_LOCAL)
    }
    return Promise.reject(error)
  },
)

Vue.prototype.$http = axiosIns

export default axiosIns
