import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'  // import VueRouter
import UserProfileView from './views/UserProfileView.vue'
import BlogView from './views/blog/BlogView.vue'
import Toast from 'vue-toastification';
import 'vuetify/dist/vuetify.min.css'
import 'vue-toastification/dist/index.css'
import { BootstrapVue, IconsPlugin} from 'bootstrap-vue'



Vue.use(VueRouter)
Vue.use(Toast)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// routes
const routes = [
  { path: '/profile', component: UserProfileView },
  { path: '/myblog', component: BlogView },
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