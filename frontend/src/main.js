import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
//import VueSession from 'vue-session'

Vue.config.productionTip = false
//Vue.use(VueSession)

const vue = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
})

vue.$mount('#app')
