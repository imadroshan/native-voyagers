<template>
    <v-navigation-drawer :value="value" @input="$emit('input', $event)" temporary>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </template>
  
  <script>
  export default {
    props: {
      value: Boolean
    },
    data() {
      return {
        items: [
          { title: 'Home' },
          { title: 'About' },
          // Add more menu items here
        ],
      };
    },
  };
  </script>
  