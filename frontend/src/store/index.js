import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null
  },
  mutations: {
    login(state, user) {
      state.currentUser = user
    },
    logout(state) {
      state.currentUser = null
    }
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
