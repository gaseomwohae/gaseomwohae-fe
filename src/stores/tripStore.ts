// src/stores/tripStore.ts
import { defineStore } from 'pinia';
import type { TripSimpleList } from '@/domain/common/model/TripSimple.type';
import type { ParticipantList } from '@/domain/common/model/Participant.type';
import type { TripInfo } from '@/domain/home/model/tripInfo.type';

export const useTripStore = defineStore('tripStore', {
  state: () => ({
    tripSimpleList: [] as TripSimpleList,
    selectedTripId: null as number | null,
    participantList: [] as ParticipantList
  }),
  actions: {
    setTripSimpleList(trips: TripSimpleList) {
      this.tripSimpleList = trips;
    },
    setSelectedTripId(tripId: number | null) {
      this.selectedTripId = tripId;
    },
    setParticipantList(participants: ParticipantList) {
      this.participantList = participants;
    }
  }
});


export const useTripInfoStore = defineStore('tripInfo', {
  state: () => ({
    tripInfo: null as TripInfo | null,
    selectedTripId: null as number | null,
  }),

  actions: {
    setTripInfo(tripInfo: TripInfo) {
      this.tripInfo = tripInfo;
    },

    updateTripInfo(updatedTripInfo: TripInfo) {
      this.tripInfo = updatedTripInfo;
    },

    // 새로운 createTrip 메서드 추가
    createTrip(newTripInfo: TripInfo) {
      this.tripInfo = newTripInfo;
      this.selectedTripId = newTripInfo.trip.id;
    },

    setSelectedTripId(id: number) {
      this.selectedTripId = id;
    },

    clearTripInfo() {
      this.tripInfo = null;
      this.selectedTripId = null;
    }
  },
});
