<script setup lang="ts"></script>

<template>
  <div class="accommodation-card-layout">
    <div class="accommodation-card-title-text" style="color: #9aa2ad">숙소</div>
    <div class="accommodation-card-list-layout">
      <div class="accommodation-item-layout">
        <div class="accommodation-card-title-text">숙소 타이틀</div>
        <img src="/src/assets/images/auth-image.png" alt="accommodation" />
      </div>
      <div class="accommodation-item-layout">
        <div class="accommodation-card-title-text">숙소 타이틀</div>
        <img src="/src/assets/images/auth-image.png" alt="accommodation" />
      </div>
      <div class="accommodation-item-layout">
        <div class="accommodation-card-title-text">숙소 타이틀</div>
        <img src="/src/assets/images/auth-image.png" alt="accommodation" />
      </div>
      <div class="accommodation-item-layout">
        <div class="accommodation-card-title-text">숙소 타이틀</div>
        <img src="/src/assets/images/auth-image.png" alt="accommodation" />
      </div>
      <div class="accommodation-item-layout">
        <div class="accommodation-card-title-text">숙소 타이틀</div>
        <img src="/src/assets/images/auth-image.png" alt="accommodation" />
      </div>
      <div class="accommodation-item-layout">
        <div class="accommodation-card-title-text">숙소 타이틀</div>
        <img src="/src/assets/images/auth-image.png" alt="accommodation" />
      </div>
      <div class="accommodation-item-layout">
        <div class="accommodation-card-title-text">숙소 타이틀</div>
        <img src="/src/assets/images/auth-image.png" alt="accommodation" />
      </div>
      <div class="accommodation-item-layout">
        <div class="accommodation-card-title-text">숙소 타이틀</div>
        <img src="/src/assets/images/auth-image.png" alt="accommodation" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .accommodation-card-layout {
    padding: 30px;
    display: flex;
    background-color: white;
    border-radius: 20px;
    flex-direction: column;
    gap: 30px;
    width: 250px;
    height: 100%;
  }

  .accommodation-card-list-layout {
    display: flex;
    flex-direction: column;
    gap: 50px;
    overflow: auto; /* 스크롤 가능하도록 설정 */
    max-height: 100%; /* 부모의 높이를 기준으로 최대 높이 설정 */
  }

  .accommodation-item-layout {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .accommodation-card-title-text {
    font-size: 20px;
    font-weight: 800;
    color: #000000;
  }

  img {
    height: 148px;
    width: auto;
    object-fit: cover;
  }
</style>
