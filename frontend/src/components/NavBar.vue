<template>
    <v-toolbar color="grey darken-3" dark>
      <v-app-bar-nav-icon @click="$emit('toggleDrawer')"></v-app-bar-nav-icon>
      <v-toolbar-title>Native Voyager</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="login-button" @click="$emit('toggleDialog')">Login</v-btn>
    </v-toolbar>
  </template>
  
  <style scoped>
  .login-button {
    background-color: #2E7D32 !important; /* Green darken-3 */
    color: white !important;
  }
  </style>
  