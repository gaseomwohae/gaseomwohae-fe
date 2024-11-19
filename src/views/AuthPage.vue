<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="image-container">
      <img src="@/assets/images/auth-image.png" alt="auth-image" />
    </div>
    <div class="spacer"></div>
    <div class="form-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
  .container {
    display: flex;
    flex-direction: row;
    /* height: 100vh; */
    background-color: white;
    border-radius: 25px;
    padding: 80px;
    align-items: center;
  }

  .image-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image-container img {
    max-width: 100%;
    max-height: 100%;
    /* object-fit: cover; */
  }

  .form-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .spacer {
    margin: 0 100px;
  }
</style>
