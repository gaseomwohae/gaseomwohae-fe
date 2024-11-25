<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import SupplyComponent from './SupplyComponent.vue';
  import { CATEGORY_MAP } from '@/domain/supply/constants/categoryMap';

  import type { Supplies } from '@/domain/supply/components/model/supply.type';
  import { supplyService } from '@/domain/supply/service/supply.service';

  const SUPPLIES = ref<Supplies>({});

  // 예시로 사용할 supplies 데이터
  onMounted(async () => {
    SUPPLIES.value = await supplyService.getSupplies();
  });

  const categoryOrder = ref([
    { key: 'REQUIRED', backgroundColor: '#FBEDEA' },
    { key: 'ELECTRONIC', backgroundColor: '#E0EEEF' },
    { key: 'BEAUTY', backgroundColor: '#D8E1FE' },
    { key: 'ETC', backgroundColor: '#FFD6E8' },
    { key: 'CLOTHES', backgroundColor: '#DFF6DD' },
    { key: 'EMERGENCY', backgroundColor: '#FFF7E5' },
  ]);
</script>

<template>
  <div class="supplies-dashboard-layout">
    <SupplyComponent
      v-for="category in categoryOrder"
      :key="category.key"
      :supplies="SUPPLIES[category.key]"
      :background-color="category.backgroundColor"
    >
      <template #header>
        <div
          class="supply-component-header-title"
          :style="{ color: CATEGORY_MAP[category.key].titleColor }"
        >
          {{ CATEGORY_MAP[category.key].title }}
        </div>
      </template>
    </SupplyComponent>
  </div>
</template>

<style scoped>
  .supply-component-header-title {
    font-size: 18px;
    font-weight: bold;
  }

  .supplies-dashboard-layout {
    display: flex;
    flex-direction: column;
    gap: 45px;
    background-color: #fff;
    padding: 45px 45px;
    border-radius: 20px;
  }
</style>
