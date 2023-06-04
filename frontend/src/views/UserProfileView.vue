<template>
    <div class="profile-container">
      <div class="row justify-center">
        <h2 class="profile-title">Your Profile</h2>
      </div>
      <div class="row justify-center">
        <div class="col-sm-8 col-md-6 col-12">
          <UserProfile />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import UserProfile from "@/components/UserProfile.vue";
  
  export default {
    components: {
      UserProfile
    }
  };
  </script>
  
  <style scoped>
  .profile-container {
    max-width: 600px;
    margin: 30px auto;
    padding: 20px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  .profile-title {
    text-align: center;
    font-size: 24px;
    color: #2E7D32;
  }
  </style>
  