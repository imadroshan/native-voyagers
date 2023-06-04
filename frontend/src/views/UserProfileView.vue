<template>
    <div class="profile-container">
      <h2 class="profile-title">Your Profile</h2>
      <UserProfile />
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
    max-width: 100%;
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
  