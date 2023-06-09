<template>
    <div ref="mapContainer" style="width: 100%; height: 100vh;"></div>
</template>

<script>
import axios from 'axios'
import mapboxgl from 'mapbox-gl'
import Vue from 'vue'
import { Carousel } from 'vuetify'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

export default {
  data() {
    return {
      map: null,
      markers: [],
      users: [],
      blogs: []
    }
  },
  async mounted() {
    // Fetch all users
    const usersResponse = await axios.get('http://localhost:3000/users')
    this.users = usersResponse.data

    // Fetch all blogs
    const blogsResponse = await axios.get('http://localhost:3000/blogs')
    this.blogs = blogsResponse.data

    // Initialize map
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_TOKEN
    this.map = new mapboxgl.Map({
      container: this.$refs.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 2
    })

    // Create a marker for each user
    for (let user of this.users) {
      const el = document.createElement('div')
      el.className = 'marker'
      el.style.backgroundImage = `url(${user.avatar})`
      el.style.width = '50px'
      el.style.height = '50px'
      el.style.borderRadius = '50%'

      const marker = new mapboxgl.Marker(el)
        .setLngLat(user.location)
        .addTo(this.map)
      
      el.addEventListener('mouseenter', async () => {
        const userBlogs = this.blogs.filter(blog => blog.authorId === user.id)

        // Create a new Vue instance with the Carousel component
        const CarouselComponent = Vue.extend({
          render(h) {
            return h('v-carousel', {
              props: { 
                cycle: true, 
                value: 0,
                height: "400",
                width: "200"
              },
              style: {
                width: '200px', 
                whiteSpace: 'nowrap', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis' 
                } 
            }, userBlogs.map(blog => {
                return h('v-carousel-item', { 
                    style: { 
                    width: '200px', 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis' 
                    } 
                },
                [
                h('h2', {}, blog.title),
                h('p', {}, blog.content),
              ])
            }))
          },
          vuetify: new Vuetify() 
        })
        const carouselInstance = new CarouselComponent()

        // Mount the instance and extract the HTML
        const popupHtml = carouselInstance.$mount().$el.outerHTML
        marker.setPopup(new mapboxgl.Popup({ anchor: 'bottom' }).setHTML(popupHtml)).togglePopup()
      })

      this.markers.push(marker)
    }
  }
}
</script>

<style>
.marker {
  cursor: pointer;
  background-size: cover;
  background-position: center;
}
</style>
