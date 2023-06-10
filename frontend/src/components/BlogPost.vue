<template>
    <!-- Author Manish-->
    <div class="blog-post">
      <h2>{{ blog.title }}</h2>
      <div class="blog-image">
        <img :src="blog.blogImgUrl" alt="Blog Image">
      </div>
      <div class="blog-full-content">
        <p>{{ blog.content }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    data() {
      return {
        blog: null
      }
    },
    async created() {
      const blogId = this.$route.params.id
      const response = await axios.get(`http://localhost:3000/blogs/${blogId}`)
      this.blog = response.data
      console.log(this.blog)
    }
  }
  </script>
  
  <style scoped>
  .blog-post {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .blog-post h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .blog-image {
    width: 100%;
    margin-bottom: 20px;
  }
  
  .blog-image img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  
  .blog-full-content {
    text-align: justify;
    line-height: 1.6;
    font-size: 18px;
  }
  </style>
  