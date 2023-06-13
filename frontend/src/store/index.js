import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    reviews: [] // Add the 'reviews' array to the state
  },
  mutations: {
    login(state, user) {
      state.currentUser = user;
    },
    logout(state) {
      state.currentUser = null;
    },
    addReview(state, review) {
      state.reviews.push(review);
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
  },
  plugins: [createPersistedState()]
});
