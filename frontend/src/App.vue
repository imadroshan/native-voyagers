<template>
  <v-app>
    <NavBar 
    @toggleDrawer="drawer = !drawer" 
    @toggleDialog="dialog = !dialog" 
    @toggleSignupDialog="signupDialog = !signupDialog" 
    />
    <SearchDrawer v-model="drawer" />
    <LoginDialog v-model="dialog" />
    <SignupDialog v-model="signupDialog" />
  </v-app>
</template>

<script>
import NavBar from './components/NavBar.vue'
import SearchDrawer from './components/SearchDrawer.vue'
import LoginDialog from './components/LoginDialog.vue'
import SignupDialog from './components/SignupDialog.vue'

export default {
  components: {
    NavBar,
    SearchDrawer,
    LoginDialog,
    SignupDialog
  },
  data() {
    return {
      drawer: false,
      dialog: false,
      signupDialog: false
    };
  },
};
</script>
