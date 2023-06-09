<template>
    <v-carousel v-if="blogs.length > 0" cycle height="200" width="200">
      <v-carousel-item v-for="blog in blogs" :key="blog.id">
        <div style="width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          <h2>{{ blog.title }}</h2>
          <p>{{ blog.content }}</p>
        </div>
      </v-carousel-item>
    </v-carousel>
  </template>
  
  <script>
  export default {
    props: {
      blogs: {
        type: Array,
        default: () => [],
      },
    },
  }
  </script>
  