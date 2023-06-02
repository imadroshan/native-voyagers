import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // your data goes here
  },
  mutations: {
    // synchronous functions to modify state
  },
  actions: {
    // asynchronous operations can go here
  },
  getters: {
    // computed properties for the state
  },
  modules: {
    // divide your store into modules if necessary
  }
})
