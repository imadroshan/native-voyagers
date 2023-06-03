<template>
    <v-dialog :value="value" @input="$emit('input', $event)" max-width="290">
      <v-card>
        <v-card-title>Sign Up</v-card-title>
        <v-card-text>
          <v-form ref="form" @submit.prevent="submitForm">
            <v-text-field label="Name" v-model="name" required></v-text-field>
            <v-text-field label="Email" v-model="email" required></v-text-field>
            <v-text-field label="Password" v-model="password" type="password" required></v-text-field>
            <v-checkbox label="Are you a native blogger?" v-model="nativeBlogger"></v-checkbox>
            <v-text-field label="Avatar URL" v-model="avatarUrl"></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="$emit('input', false)">Cancel</v-btn>
              <v-btn color="green darken-1" text type="submit">Sign Up</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
    import axios from 'axios'
    
    export default {
      props: {
        value: Boolean
      },
      data() {
        return {
          name: '',
          email: '',
          password: '',
          nativeBlogger: false,
          avatarUrl: '',
        }
      },
      methods: {
        async submitForm() {
          try {
            const response = await axios.post('http://localhost:3000/users', {
              name: this.name,
              email: this.email,
              password: this.password,
              nativeBlogger: this.nativeBlogger,
              avatar: this.avatarUrl,
            })
  
            this.$store.commit('login', response.data)
            this.$emit('input', false)
          } catch (error) {
            console.error('Failed to sign up:', error)
          }
        },
      },
    }
  </script>
  