<template>
  <v-dialog :value="value" @input="$emit('input', $event)" max-width="290">
    <v-card>
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field label="Email" v-model="email" required></v-text-field>
          <v-text-field label="Password" v-model="password" type="password" required :error-messages="passwordError" @input="resetErrors"></v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="$emit('input', false)">Cancel</v-btn>
            <v-btn color="green darken-1" text @click="submitForm">Login</v-btn>
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
      email: '',
      password: '',
      passwordError: ''
    }
  },
  methods: {
    resetErrors() {
      this.passwordError = '';
    },
    async submitForm() {
      try {
        const response = await axios.get('http://localhost:3000/users')
        const user = response.data.find(user => user.email === this.email && user.password === this.password && user.nativeBlogger)

        if (user) {
          this.$store.commit('login', user)
          this.$emit('input', false),
          this.dialog=false
        } else {
          this.passwordError = 'Invalid email or password'
        }
      } catch (error) {
        console.error('Failed to login:', error)
      }
    },
  },
}
</script>
