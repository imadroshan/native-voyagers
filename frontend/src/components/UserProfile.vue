<template>
  <v-form ref="form" @submit.prevent="submitForm">
    <v-text-field label="Name" v-model="name" required></v-text-field>
    <v-text-field label="Email" v-model="email" required></v-text-field>
    <v-text-field label="Password" v-model="password" type="password" required></v-text-field>
    <v-text-field label="Avatar URL" v-model="avatarUrl"></v-text-field>
    <v-btn color="green darken-1" text type="submit">Update</v-btn>
  </v-form>
</template>
  
<script>
import axios from 'axios'
  
export default {
  data() {
    return {
      name: this.$store.state.currentUser.name,
      email: this.$store.state.currentUser.email,
      password: this.$store.state.currentUser.password,
      avatarUrl: this.$store.state.currentUser.avatar,
    }
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.put(`http://localhost:3000/users/${this.$store.state.currentUser.id}`, {
          name: this.name,
          email: this.email,
          password: this.password,
          avatar: this.avatarUrl,
        })
        this.$store.commit('login', response.data)
      } catch (error) {
        console.error('Failed to update profile:', error)
      }
    },
  },
}
</script>
