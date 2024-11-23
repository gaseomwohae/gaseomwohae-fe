<script setup lang="ts">
import SupplyItem from './SupplyItem.vue';
import type { Supplies } from '@/domain/supply/components/model/supply.type';
import { CATEGORY_MAP } from '@/domain/supply/constants/categoryMap';

const props = defineProps<{
  supplies: Supplies[];
}>();
</script>

<template>
  <div class="check-list-layout">
    <div class="check-list-title-text">준비물</div>
    
    <div class="categories-layout">
      <!-- 각 카테고리별 섹션 -->
      <div 
        v-for="supplyGroup in props.supplies" 
        :key="supplyGroup.category"
        class="category-section"
      >
        <!-- 카테고리 제목 -->
        <div 
          class="category-title"
          :style="{ color: CATEGORY_MAP[supplyGroup.category]?.titleColor }"
        >
          {{ CATEGORY_MAP[supplyGroup.category]?.title }}
        </div>

        <!-- 카테고리 내 아이템 리스트 -->
        <div class="category-items">
          <SupplyItem 
            v-for="item in supplyGroup.supply"
            :key="item.name"
            :supply="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.check-list-layout {
  height: 100%;
  background-color: white;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
}

.check-list-title-text {
  font-size: 20px;
  font-weight: 700;
  color: #9aa2ad;
}

.categories-layout {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.category-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.category-title {
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.category-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 8px;
}
</style>
