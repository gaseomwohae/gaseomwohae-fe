<script setup lang="ts">
  import HeaderDropDown from './HeaderDropDown.vue';
  import Participation from './Participation.vue';
  import type { TripSimpleList } from '@/domain/common/model/TripSimple.type';
  import type { ParticipantList } from '@/domain/common/model/Participant.type';
  const props = defineProps<{
    tripSimpleList: TripSimpleList;
    selectedTripId: number | null;
    participantList: ParticipantList;
  }>();
</script>
<template>
  <div class="header-layout">
    <HeaderDropDown
      :trip-simple-list="props.tripSimpleList"
      :selected-trip-id="props.selectedTripId"
    />
    <Participation :participant-list="props.participantList" />
  </div>
</template>
<style scoped>
  .header-layout {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
    width: 100%;
    height: 80px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 8px;
  }
</style>
