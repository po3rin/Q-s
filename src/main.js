import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import moment from 'vue-moment'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/default.css'
import store from './store'

Vue.use(moment)
Vue.use(VueFire)
Vue.use(VueMaterial)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
