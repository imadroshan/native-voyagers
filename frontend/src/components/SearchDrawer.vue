<template>
  <v-navigation-drawer 
    :value="value" 
    @input="$emit('input', $event)" 
    absolute
    temporary 
  >
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
      class="px-4 py-2"
    ></v-text-field>

    <v-list class="px-4">
      <v-list-item 
        v-for="blog in filteredBlogs" 
        :key="blog.id"
        @click="$router.push(`/blog/${blog.id}`)"
        class="py-2 list-item"
      >
        <v-list-item-content>
          <v-list-item-title v-html="blog.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    value: Boolean
  },
  data() {
    return {
      items: [],
      blogs: [],
      search: ''
    };
  },
  computed: {
    filteredBlogs() {
      return this.blogs.filter(blog => {
        return blog.title.toLowerCase().includes(this.search.toLowerCase());
      })
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:3000/blogs');
      this.blogs = response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
.list-item {
  transition: background .3s ease-in-out;
}

.list-item:hover {
  background: #f1f1f1;
}

.v-list-item-title {
  font-size: 1rem;
}
</style>
