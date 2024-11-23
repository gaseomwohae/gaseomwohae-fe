<script setup lang="ts">
  import type { SupplyItem } from './model/supply.type';
  import { computed } from 'vue';
  import { useTripInfoStore } from '@/stores/tripStore';

  const props = defineProps<{
    supply: SupplyItem;
  }>();

  const tripStore = useTripInfoStore();

  // 카테고리별 색상 매핑
  const categoryColors = {
    'REQUIRED': '#FE742C',   // 필수
    'ELECTRONIC': '#3ABF92', // 전자기기
    'BEAUTY': '#346AFF',     // 미용
    'CLOTHES': '#6ECB63',    // 의류
    'EMERGENCY': '#FF8B60',  // 응급
    'ETC': '#F63E6A'         // 기타
  } as const;

  // tripInfo의 supplies에 현재 아이템이 포함되어 있는지 확인
  const isSelected = computed(() => {
    if (!tripStore.tripInfo?.supplies) return false;
    
    return tripStore.tripInfo.supplies.some(categorySupplies => 
      categorySupplies.supply.some(supply => supply.name === props.supply.name)
    );
  });

  // 현재 아이템의 카테고리 색상 가져오기
  const borderColor = computed(() => {
    return categoryColors[props.supply.category] || '#346AFF';
  });

  // 준비물 토글 함수
  const toggleSupply = () => {
    if (!tripStore.tripInfo) return;

    const currentSupplies = [...(tripStore.tripInfo.supplies || [])];
    const category = props.supply.category;

    if (isSelected.value) {
      // 선택된 아이템 제거
      const categoryIndex = currentSupplies.findIndex(s => s.category === category);
      if (categoryIndex !== -1) {
        currentSupplies[categoryIndex] = {
          ...currentSupplies[categoryIndex],
          supply: currentSupplies[categoryIndex].supply.filter(s => s.name !== props.supply.name)
        };
        
        // 카테고리의 모든 아이템이 제거되면 카테고리도 제거
        if (currentSupplies[categoryIndex].supply.length === 0) {
          currentSupplies.splice(categoryIndex, 1);
        }
      }
    } else {
      // 새 아이템 추가
      const categoryIndex = currentSupplies.findIndex(s => s.category === category);
      if (categoryIndex !== -1) {
        // 카테고리가 이미 존재하면 아이템만 추가
        currentSupplies[categoryIndex].supply.push(props.supply);
      } else {
        // 새 카테고리 추가
        currentSupplies.push({
          category,
          supply: [props.supply]
        });
      }
    }

    // tripInfo 업데이트
    tripStore.updateTripInfo({
      ...tripStore.tripInfo,
      supplies: currentSupplies
    });
  };
</script>

<template>
  <div 
    class="supply-card-layout"
    :class="{ 'selected': isSelected }"
    :style="isSelected ? { borderColor: borderColor } : {}"
    @click="toggleSupply"
  >
    <img :src="props.supply.src" />
    <div 
      class="supply-card-header"
      :style="isSelected ? { color: borderColor } : {}"
    >
      {{ props.supply.name }}
    </div>
  </div>
</template>

<style scoped>
  .supply-card-layout {
    background-color: white;
    height: fit-content;
    padding: 10px;
    width: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    border-radius: 10px;
    border: 2px solid transparent;
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .supply-card-layout:hover {
    background-color: #f5f5f5;
  }

  .supply-card-layout.selected {
    /* border-color는 이제 동적으로 설정됩니다 */
  }

  .supply-card-header {
    font-size: 20px;
    font-weight: 700;
    transition: color 0.2s ease;
  }

  img {
    height: 30px;
    width: 30px;
  }
</style>
