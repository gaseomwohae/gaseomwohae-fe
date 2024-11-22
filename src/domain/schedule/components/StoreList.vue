<template>
  <div class="store-list" v-if="storeList.length > 0">
    <div
      class="store"
      v-for="store in storeList"
      :key="store.id"
      draggable="true"
      @dragstart="dragStart($event, store)"
    >
      <StoreSummary :store="store" @select-store="selectStore(store.id)" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useStoreStore } from '@/stores/store';
  import { ref, watch } from 'vue';
  import type { Store } from '../model/store.type';
  import StoreSummary from './StoreSummary.vue';

  const storeList = ref<Store[]>([]);
  const storeStore = useStoreStore();

  watch(
    () => storeStore.searchedStores,
    (stores) => {
      storeList.value = stores;
      console.log(storeList.value);
    },
  );

  function selectStore(id: number) {
    storeStore.setSelectedStoreId(id);
  }

  function dragStart(event: DragEvent, store: Store) {
    if (event.dataTransfer) {
      const dragData = {
        isNewSchedule: true,
        store: store,
        duration: 30,
      };
      event.dataTransfer.setData('application/json', JSON.stringify(dragData));
      event.dataTransfer.effectAllowed = 'move';
    }
  }
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

  .store {
    background-color: #fff;
    border-radius: 1.5rem;
    padding: 1rem;
    cursor: grab;
  }

  .store:active {
    cursor: grabbing;
  }
</style>
