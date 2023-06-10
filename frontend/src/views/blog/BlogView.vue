<template>
  <div class="create-post">
    <button class="create-post-button" @click="showCreatePostPopup">Create Blog</button>

      <div v-if="CreatePopup" class="create-post-popup">
        <div class="container">
          <div :class="{ invisible: !error }" class="err-message">
            <p><span>Error:</span>{{ errorMsg }}</p>
          </div>
          <div class="blog-info">
            <label for="blog-title">Blog Title</label>
            <input id="blog-title" type="text" placeholder="Enter Blog Title" v-model="blogTitle" />
          </div>
          <div class="editor">
            <label for="blog-content">Blog Content</label>
            <textarea id="blog-content" placeholder="Enter Blog Content" v-model="blogContent"></textarea>
          </div>
          <div class="blogImgUrl">
            <label for="blog-url">Blog Image URL</label>
            <input id="blog-url" type="text" placeholder="Enter Blog Image URL" v-model="blogImgUrl" />
          </div>
          <div ref="mapContainer" class="mapBox"></div>
          <div class="blog-actions">
            <button @click="createBlog">Publish Blog</button>
            <button @click="cancelCreateBlog">Cancel</button>
          </div>
        </div>
      </div>

      <!-- card list -->
      <div class="blog-list">
        <b-card v-for="blog in blogs" :key="blog.id" class="mb-2">
          <b-card-img :src="blog.blogImgUrl" alt="Blog Image" top class="blog-img"></b-card-img>
          <b-card-body>
            <b-card-title>{{ blog.title }}</b-card-title>
            <b-card-text>{{ blog.content }}</b-card-text>
            <b-button @click="openBlog(blog.url)" variant="primary" class="read-button">Read More</b-button>
            <b-button @click="openEditPopup(blog)" class="edit-button" variant="warning">Edit</b-button>
          <b-button @click="deleteBlog(blog.id)" variant="danger">Delete</b-button>
        </b-card-body>
      </b-card>
    </div>


    <div v-if="editPopup" class="create-post-popup">
      <div class="container">
        <div :class="{ invisible: !error }" class="err-message">
          <p><span>Error:</span>{{ errorMsg }}</p>
        </div>
        <div class="blog-info">
          <label for="blog-title">Blog Title</label>
          <input id="blog-title" type="text" placeholder="Enter Blog Title" v-model="selectedBlog.title" />
        </div>
        <div class="editor">
          <label for="blog-content">Blog Content</label>
          <textarea id="blog-content" placeholder="Enter Blog Content" v-model="selectedBlog.content"></textarea>
        </div>
        <div class="blogImgUrl">
          <label for="blog-url">Blog Image URL</label>
          <input id="blog-url" type="text" placeholder="Enter Blog Image URL" v-model="selectedBlog.blogImgUrl" />
        </div>
        <div ref="mapContainer" class="mapBox"></div>
        <div class="blog-actions">
          <button @click="saveBlogEdit">Save Changes</button>
          <button @click="cancelEdit">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

export default {
  name: "CreatePost",
  data() {
    return {
      blogTitle: "",
      blogContent: "",
      blogImgUrl: "",
      error: null,
      errorMsg: null,
      CreatePopup: false,
      blogs: [],
      editPopup: false,
      selectedBlog: null,
    };
  },
  mounted() {
    this.fetchBlogs();
    // Initialize map
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_TOKEN
    this.map = new mapboxgl.Map({
      container: this.$refs.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.location,
      zoom: 2
    })

    // Add geocoder control
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    })
    this.map.addControl(geocoder)

    // Create draggable marker
    this.marker = new mapboxgl.Marker({
      draggable: true
    }).setLngLat(this.location).addTo(this.map)

    // Set marker position to geocoder result
    geocoder.on('result', e => {
      if (this.marker) {
        this.marker.remove(); // Remove the old marker
      }
      
      this.marker = new mapboxgl.Marker({ draggable: true })
        .setLngLat(e.result.geometry.coordinates)
        .addTo(this.map);
    })

    // Fetch existing blogs
    
  },
  methods: {
    showCreatePostPopup() {
      this.CreatePopup = true;
    },
    createBlog() {
      if (this.blogTitle.length !== 0 && this.blogContent.length !== 0) {
        const newBlog = {
          title: this.blogTitle,
          content: this.blogContent,
          blogImgUrl: this.blogImgUrl,
          authorId: this.$store.state.currentUser.id,
          id: this.blogs.length + 1,
          url: `http://localhost:3000/blogs/${this.blogs.length + 1}`
        };

        axios
          .post("http://localhost:3000/blogs", newBlog)
          .then(response => {
            console.log(response.data);
            this.fetchBlogs();
          })
          .catch(error => {
            console.error(error);
          });

        this.blogTitle = "";
        this.blogContent = "";
        this.blogImgUrl = "";
        this.CreatePopup = false;
      } else {
        this.error = true;
        this.errorMsg = "Please ensure Blog Title & Blog Content have been filled!";
        setTimeout(() => {
          this.error = false;
        }, 5000);
      }
    },
    cancelCreateBlog() {
      this.CreatePopup = false;
    },
    fetchBlogs() {
      axios.get('http://localhost:3000/blogs')
        .then(response => {
          const filteredBlogs = response.data.filter(blog => blog.authorId === this.$store.state.currentUser.id);
          this.blogs = filteredBlogs.map(blog => {
            return {
              ...blog,
              url: `http://localhost:3000/blogs/${blog.id}`
            };
          });
        })
        .catch(error => {
          console.error(error);
        });
    },
    deleteBlog(blogId) {
      // Perform an API request to delete the blog
      // Replace the API endpoint with your actual endpoint
      axios.delete(`http://localhost:3000/blogs/${blogId}`)
        .then(() => {
          // Remove the deleted blog from the list
          this.blogs = this.blogs.filter(blog => blog.id !== blogId);
        })
        .catch(error => {
          console.error(error);
        });
    },
    openBlog(url) {
      // Navigate to the blog URL
      window.location.href = url;
    },
    openEditPopup(blog) {
      this.selectedBlog = blog;
      this.editPopup = true;
    },
    saveBlogEdit() {
      axios.put(`http://localhost:3000/blogs/${this.selectedBlog.id}`, this.selectedBlog)
        .then(() => {
          this.editPopup = false;
        })
        .catch(error => {
          console.error(error);
        });
    },
    cancelEdit() {
      this.editPopup = false;
    },
  },
};
</script>


<style lang="scss">
.blog-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 1rem;
  margin-left: 25px;
}

.blog-img {
  height: 150px;
  width: 150px;
  object-fit: fill;
}

.b-card-body {
  margin-top: 15px;
}

.edit-button{
  margin-left: 10px;
  margin-right: 10px;
}

.b-card-title {
  line-height: 2.0rem;
  height: 2rem; /* 4 x line-height */
  overflow: hidden;
}

.card-text {
  line-height: 1.5rem;
  height: 6rem; /* 4 x line-height */
  overflow: hidden;
}

.read-button {
  background-color: #1e90ff;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.read-button:focus {
  outline: none;
  box-shadow: none;
}

.mapBox{
  width: 50%; 
  height: 250px;
}

.create-post {
  position: relative;
  height: 100%;

  .create-post-button {
    transition: 0.5s ease-in-out all;
    align-self: left;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #06681f;
    // text-decoration: none;
    border: 2px solid transparent;
    margin-top: 20px;
    margin-left: 100px;
    margin-bottom: 50px;

    &:hover {
      background-color: rgba(123, 15, 15, 0.7);
    }

    &:focus {
      outline: none;
      border-color: #303030;
    }
  }

  .create-post-popup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    background-color: #FFE9E9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 9999;
    padding: 20px;
  }

  .container {
    position: relative;
    height: 80%;
    padding: 10px 25px 60px;
  }

  // error styling
  .invisible {
    opacity: 0 !important;
  }

  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;

    p {
      font-size: 14px;
    }

    span {
      font-weight: 600;
    }
  }

  .blog-info {
    display: flex;
    margin-bottom: 32px;
    align-items: center;

    label {
      margin-right: 10px;
      font-weight: bold;
    }

    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;
      flex: 1;

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }
  }

  .editor {
    height: 40vh;
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;

    label {
      margin-bottom: 10px;
      font-weight: bold;
    }

    textarea {
      height: 100%;
      resize: vertical;
      padding: 10px 16px;
      border: none;
      border-bottom: 1px solid #303030;
      flex: 1;

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }
  }

  .blogImgUrl {
    display: flex;
    align-items: center;

    label {
      margin-right: 10px;
      font-weight: bold;
    }

    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;
      flex: 1;

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }
  }

  .blog-actions {
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
  }
  .blog-card {
      width: 200px;
      height: 300px;
      margin: 0 10px 10px 0;
      border: 1px solid #ccc;
      border-radius: 4px;
      overflow: hidden;

      .blog-image {
        height: 200px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .blog-content {
        padding: 10px;

        h3 {
          font-size: 16px;
          margin-bottom: 10px;
        }

        .blog-buttons {
          display: flex;
          justify-content: space-between;

          button {
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;

            &.edit-button {
              background-color: #1e90ff;
              color: #fff;
            }

            &.delete-button {
              background-color: #ff0000;
              color: #fff;
            }
            &.read-button{
              background-color: #1e90ff;
              color: #fff;
            }
            .read-button.focus{
              outline: none;
            }
          }
        }
      }
    }
}
</style>
