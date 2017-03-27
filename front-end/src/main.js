import Vue from 'vue'
import VueRouter from 'vue-router'
import {router} from './config/router'
import VueBlu from 'vue-blu'
import 'vue-blu/dist/css/vue-blu.min.css'
import store from './config/store'

Vue.use(VueBlu)
Vue.use(VueRouter)

new Vue({
  router,
  store
}).$mount('#app')
