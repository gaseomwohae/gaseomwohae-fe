<script setup lang="ts">
import SupplyComponent from './SupplyComponent.vue';
import { SUPPLIES } from '../constants/supplies';
import { CATEGORY_MAP } from '../constants/categoryMap';
import type { SupplyCategory } from '../components/model/supply.type';

interface CategoryConfig {
  key: SupplyCategory;
  backgroundColor: string;
}

const categoryOrder: CategoryConfig[] = [
  {
    key: 'REQUIRED',
    backgroundColor: '#FBEDEA'
  },
  {
    key: 'ELECTRONIC',
    backgroundColor: '#E0EEEF'
  },
  {
    key: 'BEAUTY',
    backgroundColor: '#D8E1FE'
  },
  {
    key: 'ETC',
    backgroundColor: '#FFD6E8'
  },
  {
    key: 'CLOTHES',
    backgroundColor: '#DFF6DD'
  },
  {
    key: 'EMERGENCY',
    backgroundColor: '#FFF7E5'
  }
];
</script>

<template>
  <div class="supplies-dash-outside-layout">
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
.supplies-dash-outside-layout {
  background-color: white;
  height: 100%;
  width: 100%;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: end;
  overflow-y: auto;
}

.supply-component-header-title {
  font-size: 20px;
  font-weight: 700;
}
</style>
