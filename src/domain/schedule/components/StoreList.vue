<template>
  <div class="store-list">
    <div v-for="store in storeList" :key="store.id">
      <StoreSummary :store="store" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';

  import type { Store } from '../model/store.type';
  import StoreSummary from './StoreSummary.vue';

  const storeList = ref<Store[]>([]);

  onMounted(async () => {
    //storeList.value = await storeService.getStoreList();
    // 임시 데이터
    for (let i = 0; i < 10; i++) {
      storeList.value.push({
        id: 1,
        img: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20230328_14%2F16799977826750ra8V_JPEG%2F320387422_892651581733361_6537465896771139005_n.jpg',
        category: '햄버거',
        name: '버거베이',
        address: '부산시 기장군',
        reviewRate: 4.5,
        description: '맛있는 햄버거 맛집',
      });
    }
  });
</script>

<style scoped>
  .store-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100%;
    width: 100%;
    overflow: auto;
  }
</style>
