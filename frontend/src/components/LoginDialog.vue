<template>
    <v-dialog :value="value" @input="$emit('input', $event)" max-width="290">
      <v-card>
        <v-card-title class="headline">Login</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field label="Username" required></v-text-field>
            <v-text-field type="password" label="Password" required></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="$emit('input', false)">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="login">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    props: {
      value: Boolean
    },
    methods: {
      login() {
        // Login Logic Here
        this.$emit('input', false)
      },
    },
  };
  </script>
  