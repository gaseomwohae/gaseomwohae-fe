import { defineStore } from 'pinia';

export const useStoreStore = defineStore('store', {
  state: () => ({
    selectedStoreId: null as number | null,
  }),
  actions: {
    setSelectedStoreId(id: number) {
      if (this.selectedStoreId === id) {
        this.selectedStoreId = null;
      } else {
        this.selectedStoreId = id;
      }
    },
  },
});
