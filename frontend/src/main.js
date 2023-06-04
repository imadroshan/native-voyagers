import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'  // import VueRouter
import UserProfileView from './views/UserProfileView.vue'  // import UserProfileView
import 'vuetify/dist/vuetify.min.css'

Vue.use(VueRouter)  

// routes
const routes = [
  { path: '/profile', component: UserProfileView },
]

const router = new VueRouter({
  routes,
})

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  router,  
  render: h => h(App)
}).$mount('#app')
