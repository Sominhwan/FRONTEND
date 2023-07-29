import Vue from 'vue'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')


