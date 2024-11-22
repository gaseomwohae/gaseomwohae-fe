import type { Store } from '@/domain/schedule/model/store.type';
import { defineStore } from 'pinia';
export const useStoreStore = defineStore('store', {
  state: () => ({
    selectedStoreId: null as number | null,
    searchedStores: [] as Store[],
  }),
  actions: {
    setSelectedStoreId(id: number) {
      if (this.selectedStoreId === id) {
        this.selectedStoreId = null;
      } else {
        this.selectedStoreId = id;
      }
    },
    setSearchedStores(stores: Store[]) {
      this.searchedStores = stores;
    },
  },
});
