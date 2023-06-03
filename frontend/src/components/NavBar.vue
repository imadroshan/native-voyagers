<template>
  <v-toolbar color="grey darken-3" dark>
    <v-app-bar-nav-icon @click="$emit('toggleDrawer')"></v-app-bar-nav-icon>
    <v-toolbar-title>Native Voyager</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn class="login-button" v-if="!loggedIn" @click="$emit('toggleDialog')">Login</v-btn>
    <v-menu offset-y v-else>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on">
          <v-avatar>
            <img :src="currentUser.avatar" />
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="gotoProfile">
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item @click="gotoSettings">
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      currentUser: state => state.currentUser,
      loggedIn: state => !!state.currentUser
    }),
  },
  methods: {
    gotoProfile() {
      // Navigate to profile page.
    },
    gotoSettings() {
      // Navigate to settings page.
    },
    logout() {
      this.$store.commit('logout')
    },
  },
}
</script>

<style scoped>
.login-button {
  background-color: #2E7D32 !important; /* Green darken-3 */
  color: white !important;
}
</style>
