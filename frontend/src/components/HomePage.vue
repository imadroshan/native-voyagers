<template>
    <div ref="mapContainer" style="width: 100%; height: 100vh;"></div>
</template>

<script>
import axios from 'axios'
import mapboxgl from 'mapbox-gl'
import { Swiper as SwiperClass, Navigation, Pagination } from 'swiper'

SwiperClass.use([Navigation, Pagination]);

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
      center: [8.6821, 49.3988],
      zoom: 10
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

        let carouselHtml = `
          <div class="swiper-container" style="width: 200px; height: 300px;">
            <div class="swiper-wrapper">`;

        userBlogs.forEach(blog => {
          let contentSnippet = blog.content.substring(0, 200) + '...';

          carouselHtml += `
            <div class="swiper-slide" style="overflow:auto; pointer-events:none">
              <h2>${blog.title}</h2>
              <img src="${blog.blogImgUrl}" style="width:100%; height:150px; object-fit:cover"/>
              <p class="blog-snippet">${contentSnippet}</p>
            </div>`;
        });

        carouselHtml += `
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
          </div>`;

        marker.setPopup(new mapboxgl.Popup({ maxWidth: '200px' }).setHTML(carouselHtml)).togglePopup()

        new SwiperClass('.swiper-container', {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        });
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

/* Swiper default styles */
.swiper-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}
.blog-content {
    font-size: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* number of lines to show */
    -webkit-box-orient: vertical;
  }
.blog-snippet {
    font-size: small;
}
</style>

