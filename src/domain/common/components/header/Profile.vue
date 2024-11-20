<template>
  <div class="profile-container">
    <div class="profile-info-container">
      <div class="profile-info-layout">
        <div class="profile-info-text">김정현</div>
      </div>
      <img src="/src/assets/icons/profile.png" alt="profile" class="profile-layout" />
    </div>
  </div>
</template>

<style scoped>
  .profile-info-container {
    position: relative;
    width: auto;
  }

  .profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .profile-layout {
    width: 48px;
    height: 48px;
    border: 3px solid #346aff;
    border-radius: 50%;
    cursor: pointer;
  }

  .profile-layout:hover {
    background-color: #faf9ff;
  }

  .profile-info-layout {
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
    width: fit-content;
    display: inline-block;
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translate(-50%, 0px);
    opacity: 0;
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
    padding: 10px 15px;
    background-color: white;
    border-radius: 5px;
  }

  .profile-container:hover .profile-info-layout {
    opacity: 1;
    transform: translate(-50%, -10px);
  }

  .profile-info-text {
    font-family: 'NaumGothic';
    font-size: 12px;
    font-weight: 800;
    text-align: center;
  }
</style>
