<template>
  <div class="review-section">
    <h2>Reviews</h2>
    <div v-if="reviews && reviews.length === 0">
      <p>No reviews yet.</p>
    </div>
    <ul v-else-if="reviews">
      <li v-for="review in reviews" :key="review.id" class="review-item">
        <div class="review-header">
          <p class="author">{{ review.authorname }}</p>
          <p class="rating">Rating: {{ review.rating }}/5</p>
        </div>
        <p class="comment">{{ review.comment }}</p>
      </li>
    </ul>
    <div>
      <h3>Add a Review</h3>
      <form @submit.prevent="submitReview" class="review-form">
        <label for="author">Author:</label>
        <input type="text" id="author" v-model="newReview.authorname" required>
        <label for="comment">Comment:</label>
        <textarea id="comment" v-model="newReview.comment" required></textarea>
        <label for="rating">Rating:</label>
        <select id="rating" v-model="newReview.rating" required>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newReview: {
        authorname: '',
        comment: '',
        rating: null
      }
    };
  },
  computed: {
    reviews() {
      return this.$store.state.reviews;
    }
  },
  methods: {
    async submitReview() {
      try {
        const response = await axios.post('http://localhost:3000/reviews', {
          authorname: this.newReview.authorname,
          comment: this.newReview.comment,
          rating: this.newReview.rating
        });

        this.$store.commit('addReview', response.data);

        this.newReview.authorname = '';
        this.newReview.comment = '';
        this.newReview.rating = null;
      } catch (error) {
        console.error('Failed to submit review:', error);
      }
    }
  }
};
</script>

<style scoped>
.review-section {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.review-item {
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.author {
  font-weight: bold;
}

.rating {
  color: #ffcc00;
}

.comment {
  font-size: 16px;
}

.review-form {
  margin-top: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
textarea,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

button {
  background-color: #007bff;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0069d9;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

</style>
