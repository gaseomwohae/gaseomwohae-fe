<template>
  <div class="schedule-container">
    <div class="time-table__header">2024년 11월 21일</div>
    <div class="time-table">
      <div class="time-table__body" @dragover="handleDragOver" @drop="handleDrop">
        <div v-for="time in times" :key="time" class="time-slot">
          <TimeSlot :time="time" />
        </div>
        <div class="schedule-blocks">
          <ScheduleBlock
            v-for="schedule in schedules"
            :key="schedule.id"
            v-bind="schedule"
            @update-start-time="updateStartTime"
            @update-end-time="updateEndTime"
            @move-schedule="moveSchedule"
          />
        </div>
        <div v-if="isDragging || isResizing" class="drag-guideline" :style="guidelineStyle"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import type { ScheduleTime } from '../model/schedule.type';
  import { generateTimeSlots, minutesToTime, timeToMinutes } from '../utils/timeUtils';
  import ScheduleBlock from './ScheduleBlock.vue';
  import TimeSlot from './TimeSlot.vue';

  // Constants
  const MINUTES_PER_SLOT = 30;
  const SLOT_HEIGHT = 84; // 6rem = 84px

  // State
  const times = ref(generateTimeSlots());
  const schedules = ref<ScheduleTime[]>([
    { id: 1, startTime: '01:00', endTime: '09:00' },
    { id: 2, startTime: '11:00', endTime: '12:00' },
    { id: 3, startTime: '12:00', endTime: '13:00' },
  ]);

  // Drag and drop state
  const isResizing = ref(false);
  const isDragging = ref(false);
  const dragOverTime = ref('');
  const guidelineStyle = ref({});

  // 특정 스케줄이 다른 스케줄과 겹치는지 체크
  const checkOverlap = (id: number, startTime: string, endTime: string): boolean => {
    const newStart = timeToMinutes(startTime);
    const newEnd = timeToMinutes(endTime);

    return schedules.value.some((schedule) => {
      // 자기 자신은 중복 체크에서 제외
      if (schedule.id === id) {
        return false;
      }

      const existingStart = timeToMinutes(schedule.startTime);
      const existingEnd = timeToMinutes(schedule.endTime);

      return (
        (newStart >= existingStart && newStart < existingEnd) ||
        (newEnd > existingStart && newEnd <= existingEnd) ||
        (newStart <= existingStart && newEnd >= existingEnd)
      );
    });
  };

  // 스케줄 시작 시간 업데이트
  const updateStartTime = (id: number, newStartTime: string) => {
    const schedule = schedules.value.find((s) => s.id === id);
    if (!schedule || checkOverlap(id, newStartTime, schedule.endTime)) return false;

    schedule.startTime = newStartTime;
    return true;
  };

  // 스케줄 종료 시간 업데이트
  const updateEndTime = (id: number, newEndTime: string) => {
    const schedule = schedules.value.find((s) => s.id === id);
    if (!schedule || checkOverlap(id, schedule.startTime, newEndTime)) return false;

    schedule.endTime = newEndTime;
    return true;
  };

  // 픽셀 위치를 시간으로 변환
  const calculateTimeFromPosition = (e: DragEvent): string => {
    // 현재 타겟이 없으면 00:00 반환
    if (!e.currentTarget) return '00:00';

    // 현재 타겟의 위치 계산
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const draggedBlock = document.querySelector('.schedule-block[dragging="true"]') as HTMLElement;

    if (!draggedBlock) return '00:00';

    // 마우스 위치에서 time-table__body의 상단까지의 거리 계산
    const relativeY = e.clientY - rect.top;

    // 드래그 시작 시의 마우스와 블록 상단과의 거리
    const mouseOffset = parseInt(draggedBlock.getAttribute('data-mouse-offset') || '0');

    // 실제 블록이 위치해야 할 곳 계산
    const targetPosition = relativeY - mouseOffset;

    // 30분 단위로 반올림
    const totalSlots = Math.round(targetPosition / SLOT_HEIGHT);
    const totalMinutes = totalSlots * MINUTES_PER_SLOT;

    // 시간 범위 제한 (0시 ~ 23시 59분)
    if (totalMinutes < 0) return '00:00';
    if (totalMinutes >= 24 * 60) return '23:30';

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    isDragging.value = true;

    dragOverTime.value = calculateTimeFromPosition(e);
    const slotIndex = Math.floor(timeToMinutes(dragOverTime.value) / 30);

    guidelineStyle.value = {
      top: `${slotIndex * 6}rem`,
      display: 'block',
    };
  };

  const moveSchedule = (id: number, newStartTime: string) => {
    const schedule = schedules.value.find((s) => s.id === id);
    if (!schedule) return false;

    const duration = timeToMinutes(schedule.endTime) - timeToMinutes(schedule.startTime);
    const newEndTime = minutesToTime(timeToMinutes(newStartTime) + duration);

    if (checkOverlap(id, newStartTime, newEndTime)) return false;

    schedule.startTime = newStartTime;
    schedule.endTime = newEndTime;
    return true;
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    isDragging.value = false;

    if (!e.dataTransfer) return;

    const data = JSON.parse(e.dataTransfer.getData('application/json'));
    if (data.scheduleId) {
      moveSchedule(data.scheduleId, dragOverTime.value);
    }
  };
</script>

<style scoped>
  .schedule-container {
    display: flex;
    min-width: 25rem;
    width: 25rem;
    flex-direction: column;
    height: 100%;
    background-color: #faf9ff;
    border-radius: 2rem;
  }

  .time-table__header {
    padding: 2rem;
    position: sticky;
    background-color: #ffffff;
    border-bottom: solid 0.1rem #00000020;
    text-align: center;
    user-select: none;
    border-radius: 2rem 2rem 0 0;
  }

  .time-table__body {
    border-top: dashed 0.1px #00000020;
    position: relative;
    height: calc(24 * 12rem);
    border-radius: 0 0 2rem 2rem;
  }

  .time-table {
    overflow: auto;
  }

  .time-slots {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: grid;
    grid-template-rows: repeat(48, 6rem);
  }

  .drag-guideline {
    position: absolute;
    left: 0;
    right: 0;
    height: 0.25rem;
    background-color: #3b82f6;
    pointer-events: none;
  }
</style>
