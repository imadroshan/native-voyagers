<template>
  <v-toolbar class="my-toolbar" color="grey darken-3" dark>
    <v-app-bar-nav-icon @click="$emit('toggleDrawer')"></v-app-bar-nav-icon>
    <v-toolbar-title class="clickable-title" @click="gotoHomePage">Native Voyager</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn class="all-blogs-button" @click="gotoAllBlogs">All Blogs</v-btn>
    <v-spacer></v-spacer>
    <v-btn class="my-blog-button" @click="gotoMyBlog" v-if="loggedIn">My Blog</v-btn>
    <v-btn class="signup-button" v-if="!loggedIn" @click="$emit('toggleSignupDialog')">Sign Up</v-btn> 
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
    gotoMyBlog() {
      // Check if the current route is already '/myblog' to avoid redundant navigation
      if (this.$route.path !== '/myblog') {
        this.$router.push('/myblog');
      }
    },
    gotoProfile() {
      if (this.$route.path !== '/profile') {
      this.$router.push('/profile');
      }
    },
    gotoSettings() {
      // Navigate to settings page.
    },
    logout() {
      this.$store.commit('logout')
    },
    gotoHomePage() {
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    },
    gotoAllBlogs() {
    if (this.$route.path !== '/allblogs') {
      this.$router.push('/allblogs');
    }
  },
  },
}
</script>

<style scoped>
.signup-button {
  background-color: #0b8e81 !important; /* Indigo darken-1 */
  color: white !important;
  margin-right: 10px;
}
.login-button {
  background-color: #2E7D32 !important; /* Green darken-3 */
  color: white !important;
}
.my-blog-button {
  background-color: #0b8e81 !important; /* Indigo darken-1 */
  color: white !important;
  margin-right: 10px;
}
.my-toolbar {
  contain: layout;
  display: block;
  flex: none; 
  max-width: 100%;
  transition: transform .2s cubic-bezier(.4,0,.2,1),background-color .2s cubic-bezier(.4,0,.2,1),left .2s cubic-bezier(.4,0,.2,1),right .2s cubic-bezier(.4,0,.2,1),box-shadow .28s cubic-bezier(.4,0,.2,1),max-width .25s cubic-bezier(.4,0,.2,1),width .25s cubic-bezier(.4,0,.2,1);
  position: relative;
}
.clickable-title {
  cursor: pointer;
}
.all-blogs-button {
  background-color: #9d5fcd !important; /* Purple darken-1 */
  color: white !important;
}
</style>
