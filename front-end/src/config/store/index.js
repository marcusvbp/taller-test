import Vue from 'vue'
import Vuex from 'vuex'
import tickets from './modules/tickets'
import products from './modules/products'
import categories from './modules/categories'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tickets,
    products,
    categories
  }
})
