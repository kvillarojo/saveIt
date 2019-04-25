// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import './plugins/vuetify'
import router from './router'
import 'vuetify/dist/vuetify.min.css'
import App from './App'

Vue.use(Vuetify)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


