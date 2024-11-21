<template>
  <div class="time-table">
    <div class="time-table__header">2024년 11월 21일</div>
    <div class="time-table__body">
      <div v-for="time in times" :key="time" class="time-slot">
        <TimeSlot :time="time" />
      </div>
      <div class="schedule-blocks">
        <ScheduleBlock
          v-for="schedule in schedules"
          :key="schedule.id"
          :id="schedule.id"
          :startTime="schedule.startTime"
          :endTime="schedule.endTime"
          @update-start-time="updateStartTime"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import type { ScheduleTime } from '../model/schedule.type';
  import ScheduleBlock from './ScheduleBlock.vue';
  import TimeSlot from './TimeSlot.vue';

  const times = ref(generateTimeSlots());
  const schedules = ref<ScheduleTime[]>([
    {
      id: 1,
      startTime: '01:00',
      endTime: '09:00',
    },
    {
      id: 2,
      startTime: '11:00',
      endTime: '12:00',
    },
    {
      id: 3,
      startTime: '12:00',
      endTime: '13:00',
    },
  ]);

  function generateTimeSlots() {
    const times: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        times.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return times;
  }

  const updateStartTime = (id: number, newStartTime: string) => {
    console.log(newStartTime);
    // schedules 배열에서 해당 아이템을 찾아서 startTime을 업데이트
    const targetSchedule = schedules.value.find((schedule) => schedule.id === id);
    if (targetSchedule) {
      targetSchedule.startTime = newStartTime;
    } else {
      console.log('해당 아이템을 찾을 수 없습니다.');
    }
  };
</script>

<style scoped>
  .time-table {
    width: 25rem;

    background-color: #faf9ff;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 2rem;
    border: 1px solid #000000;
    overflow: auto;
    gap: 10rem;
  }

  .time-table__header {
    padding: 2rem;
    position: sticky;
    top: 0;
    background-color: #ffffff;
    z-index: 1;
    border-bottom: solid 0.1rem #00000020;
    text-align: center;
  }

  .time-table__body {
    border-top: dashed 0.1px #00000020;
    position: relative;
    display: grid;
    grid-template-rows: repeat(48, 1fr); /* 48 half-hour slots */
  }

  .schedule-blocks {
    padding: 100px;
  }
</style>
