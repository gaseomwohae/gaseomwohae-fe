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


export const useTripInfoStore = defineStore('tripInfoStore', {
  state: () => ({
    tripInfo: null as TripInfo | null
  }),
  actions: {
    setTripInfo(tripInfo: TripInfo) {
      this.tripInfo = tripInfo;
    }
  }
});
