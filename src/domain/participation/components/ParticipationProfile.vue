<template>
  <div class="participation-profile-layout">
    <img src="/src/assets/icons/profile.png" />
    <div class="participation-profile-name">이름</div>
  </div>
</template>

<style scoped>
  .participation-profile-layout {
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  .participation-profile-name {
    font-size: 24px;
    font-weight: 800;
  }
</style>
