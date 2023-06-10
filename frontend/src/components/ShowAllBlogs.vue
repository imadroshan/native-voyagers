<template>
  <!-- Author Manish-->
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" v-for="blog in blogs" :key="blog.id">
          <router-link :to="`/blog/${blog.id}`" style="text-decoration: none; color: inherit">  
            <v-card>
              <v-img :src="blog.blogImgUrl" aspect-ratio="1.7"></v-img>
              <v-card-title>{{ blog.title }}</v-card-title>
              <v-card-subtitle>{{ getExcerpt(blog.content) }}</v-card-subtitle>
            </v-card>
          </router-link>  
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        blogs: []
      };
    },
    methods: {
      getExcerpt(content) {
        const limit = 80;  // Adjust as needed
        return content.length > limit ? content.substring(0, limit) + '...' : content;
      },
    },
    async mounted() {
      try {
        const response = await axios.get('http://localhost:3000/blogs');
        this.blogs = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  }
  </script>
  
  <style scoped>
  .v-card {
    margin-bottom: 20px;
  }
  </style>
  