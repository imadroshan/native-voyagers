<template>
  <div class="create-post">
    <button class="create-post-button" @click="showCreatePostPopup">Create Blog</button>

    <div v-if="showPopup" class="create-post-popup">
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
        <div class="blog-actions">
          <button @click="createBlog">Publish Blog</button>
          <router-link class="router-button" :to="{ name: 'BlogPreview' }">Post Preview</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "CreatePost",
  data() {
    return {
      blogTitle: "",
      blogContent: "",
      blogImgUrl: "",
      error: null,
      errorMsg: null,
      showPopup: false
    };
  },
  methods: {
    showCreatePostPopup() {
      this.showPopup = true;
    },
    createBlog() {
      if (this.blogTitle.length !== 0 && this.blogContent.length !== 0) {
        const newBlog = {
          title: this.blogTitle,
          content: this.blogContent,
          blogImgUrl: this.blogImgUrl,
          authorId: this.$store.state.currentUser.id,
          url: `http://localhost:3000/blogs/${this.$store.state.currentUser.id}`
        };

        axios
          .post("http://localhost:3000/blogs", newBlog)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });

        this.blogTitle = "";
        this.blogContent = "";
        this.blogImgUrl = "";
        this.showPopup = false;
      } else {
        this.error = true;
        this.errorMsg = "Please ensure Blog Title & Blog Content have been filled!";
        setTimeout(() => {
          this.error = false;
        }, 5000);
      }
    },
  },
};
</script>


<style lang="scss">
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
    background-color: #a91616;
    // text-decoration: none;
    border: 2px solid transparent;

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
    background-color: #ffffff26;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }

  .container {
    position: relative;
    height: 100%;
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
    height: 60vh;
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
}
</style>
