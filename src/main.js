import 'nprogress/nprogress.css'
import Vue from 'vue'
import LoadScript from 'vue-plugin-load-script'
import 'vuetify/dist/vuetify.min.css'
import nprogress from '../src/assets/css/nprogress.css'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store/vuex'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  nprogress,
  LoadScript,
  render: h => h(App)
}).$mount('#app')


