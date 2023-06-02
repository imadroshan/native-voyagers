<template>
  <v-app>
    <NavBar @toggleDrawer="drawer = !drawer" @toggleDialog="dialog = !dialog" />
    <SearchDrawer v-model="drawer" />
    <LoginDialog v-model="dialog" />
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue'
import SearchDrawer from './components/SearchDrawer.vue'
import LoginDialog from './components/LoginDialog.vue'

export default {
  components: {
    NavBar,
    SearchDrawer,
    LoginDialog
  },
  data() {
    return {
      drawer: false,
      dialog: false
    };
  },
};
</script>
