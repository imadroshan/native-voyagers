<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <v-form ref="form" @submit.prevent="handleFormSubmit">
          <v-text-field label="Name" v-model="name" required></v-text-field>
          <v-text-field label="Email" v-model="email" required></v-text-field>
          <v-text-field label="Password" v-model="password" type="password" required></v-text-field>
          <v-text-field label="Avatar URL" v-model="avatarUrl"></v-text-field>
          <v-text-field label="Location" v-model="locationString" readonly></v-text-field>
          <v-btn color="green darken-1" text type="submit">Update</v-btn>
        </v-form>
      </v-col>
      <v-col cols="8">
        <div ref="mapContainer" style="width: 100%; height: 600px;"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
  
export default {
  data() {
    return {
      name: this.$store.state.currentUser.name,
      email: this.$store.state.currentUser.email,
      password: this.$store.state.currentUser.password,
      avatarUrl: this.$store.state.currentUser.avatar,
      location: this.$store.state.currentUser.location || [0, 0],
      map: null,
      marker: null
    }
  },
  computed: {
    locationString() {
      return `Longitude: ${this.location[0]}, Latitude: ${this.location[1]}`;
    }
  },
  mounted() {
    // Initialize map
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_TOKEN
    this.map = new mapboxgl.Map({
      container: this.$refs.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.location,
      zoom: 5
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
    })
    .setLngLat(this.location)
    .addTo(this.map)
    .on('dragend', () => {
      this.location = this.marker.getLngLat().toArray();
    });

    // Set marker position to geocoder result
    geocoder.on('result', e => {
      if (this.marker) {
        this.marker.remove(); // Remove the old marker
      }
      
      this.marker = new mapboxgl.Marker({ draggable: true })
        .setLngLat(e.result.geometry.coordinates)
        .addTo(this.map)
        .on('dragend', () => {
          this.location = this.marker.getLngLat().toArray();
        });
    });
  },
  methods: {
    handleFormSubmit() {
      this.submitForm(this.location);
    },
    async submitForm(lngLat) {
      try {
        const response = await axios.put(`http://localhost:3000/users/${this.$store.state.currentUser.id}`, {
          name: this.name,
          email: this.email,
          password: this.password,
          avatar: this.avatarUrl,
          location: lngLat
        })
        this.$store.commit('login', response.data)
        this.$toast.success('Profile updated successfully!')
      } catch (error) {
        console.error('Failed to update profile:', error)
        this.$toast.error('Failed to update profile')
      }
    },
  },
}
</script>

<style scoped>
</style>
