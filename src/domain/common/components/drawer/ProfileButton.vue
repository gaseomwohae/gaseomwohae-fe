
<script setup lang="ts">
</script>

<template>
    div
    <button class="profile-button-layout profile-button profile-font " @click="toggleDropdown">
        <div class="profile-layout">
            <img src="/src/assets/icons/profile.png" alt="profile" class="profile-layout" > 
            <div class="profile-badge">
            </div>
        </div>
        <span>프로필</span>
  </button>
</template>

<style scoped>
  .profile-button-layout {
    margin-top:auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    gap: 10px;
    bottom: 0px;
  }

  .profile-button {
    width: 100%;
    height: 55px;
    border-radius: 20px;
    background-color: #fff;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  .profile-button:hover {
    background-color: #FAF9FF;
  }

  .profile-font{
    font-size: 16px;
    font-weight: 400;
  }
  
  img{
    height: 35px;
    width: 35px;
  }

  .profile-layout{
    position: relative;
  }

  .profile-badge{
    display: inline-block; /* todo 초대 알림이 올 시 display 변경 */
    position: absolute;
    right: 0px;
    top: 0px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #3A6FF9;
  }

</style>    
