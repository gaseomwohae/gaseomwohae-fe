// src/stores/tripStore.ts
import { defineStore } from 'pinia';
import type { TripSimpleList } from '@/domain/common/model/TripSimple.type';
import type { TripInfo } from '@/domain/home/model/tripInfo.type';
import type { Participant } from '@/domain/common/model/Participant.type';

export const useTripStore = defineStore('tripStore', {
  state: () => ({
    tripSimpleList: [] as TripSimpleList,
    selectedTripId: null as number | null,
  }),
  actions: {
    setTripSimpleList(trips: TripSimpleList) {
      this.tripSimpleList = trips;
    },
    setSelectedTripId(tripId: number | null) {
      this.selectedTripId = tripId;
    },
  }
}
);


export const useTripInfoStore = defineStore('tripInfo', {
  state: () => ({
    tripInfo: null as TripInfo | null,
  }),

  actions: {
    setTripInfo(tripInfo: TripInfo) {
      this.tripInfo = tripInfo;
    },

    updateTripInfo(updatedTripInfo: TripInfo) {
      this.tripInfo = updatedTripInfo;
    },

    // participants만 업데이트하는 메서드 추가
    updateParticipants(participants: Participant[]) {
      if (this.tripInfo) {
        this.tripInfo.participants = [...participants];
      }
    },

    // 새로운 createTrip 메서드 추가
    createTrip() {
      
    },

    clearTripInfo() {
      this.tripInfo = null;
    }
  },
  
});
