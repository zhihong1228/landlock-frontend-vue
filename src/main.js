import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'
// import TawkMessengerVue from '@tawk.to/tawk-messenger-vue'

import { StripePlugin } from '@vue-stripe/vue-stripe'
import router from './router'
import store from './store'
import App from './App.vue'

// Global Components
import './global-components'

// 3rd party plugins
import '@/libs/portal-vue'
import '@/libs/toastification'

const stripeLivePK = process.env.VUE_APP_STRIPE_PK
const options = {
  pk: stripeLivePK,
  apiVersion: '2020-08-27',
}

Vue.use(StripePlugin, options)

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

// Composition API
Vue.use(VueCompositionAPI)

// eslint-disable-next-line no-param-reassign,no-return-assign
const update = (el, binding) => (el.style.visibility = binding.value ? 'hidden' : '')

Vue.directive('hide', {
  // Run on initialisation (first render) of the directive on the element
  bind: update,
  // Run on subsequent updates to the value supplied to the directive
  update,
})

// console.log('---------------------->' ,process.env.VUE_APP_TAWK_PROPERTY_ID);
// Vue.use(TawkMessengerVue, {
//   propertyId: '62757bd67b967b11798e24aa',
//   widgetId: '1g2dengci',
// })

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')
require('@core/assets/fonts/feather/iconfont.css') // For form-wizard

Vue.config.productionTip = false

Vue.prototype.$screen = Vue.observable({
  width: window.innerWidth,
  height: window.innerHeight,
})

window.addEventListener('resize', () => {
  Vue.prototype.$screen.width = window.innerWidth
  Vue.prototype.$screen.height = window.innerHeight
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
