<template>
  <div class="time-table">
    <div class="time-table__header">2024년 11월 21일</div>
    <div
      class="time-table__body"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
    >
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
          @resize-start="handleResizeStart"
          @resize-end="handleResizeEnd"
          @resize-move="handleResizeMove"
        />
      </div>
      <div v-if="isDragging || isResizing" class="drag-guideline" :style="guidelineStyle"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import type { ScheduleTime } from '../model/schedule.type';
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
  const isDragging = ref(false);
  const dragOverTime = ref('');
  const guidelineStyle = ref({
    top: '0px',
    display: 'none',
  });

  // State 추가
  const isResizing = ref(false);
  const resizeGuidelinePosition = ref(0);

  // Time utility functions
  function generateTimeSlots() {
    const times: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        times.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
      }
    }
    return times;
  }

  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const minutesToTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  // Schedule management functions
  const checkOverlap = (id: number, startTime: string, endTime: string): boolean => {
    const newStart = timeToMinutes(startTime);
    const newEnd = timeToMinutes(endTime);

    return schedules.value.some((schedule) => {
      if (schedule.id === id) return false;

      const existingStart = timeToMinutes(schedule.startTime);
      const existingEnd = timeToMinutes(schedule.endTime);

      return (
        (newStart >= existingStart && newStart < existingEnd) ||
        (newEnd > existingStart && newEnd <= existingEnd) ||
        (newStart <= existingStart && newEnd >= existingEnd)
      );
    });
  };

  const updateStartTime = (id: number, newStartTime: string) => {
    const schedule = schedules.value.find((s) => s.id === id);
    if (!schedule || checkOverlap(id, newStartTime, schedule.endTime)) return false;

    schedule.startTime = newStartTime;
    return true;
  };

  const updateEndTime = (id: number, newEndTime: string) => {
    const schedule = schedules.value.find((s) => s.id === id);
    if (!schedule || checkOverlap(id, schedule.startTime, newEndTime)) return false;

    schedule.endTime = newEndTime;
    return true;
  };

  // Drag and drop handlers
  const calculatePosition = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    return (totalMinutes / MINUTES_PER_SLOT) * SLOT_HEIGHT;
  };

  const calculateTimeFromPosition = (e: DragEvent): string => {
    if (!e.currentTarget) return '00:00';

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
      top: `${slotIndex * SLOT_HEIGHT}px`,
      height: '2px',
      display: 'block',
    };
  };

  const handleDragLeave = () => {
    isDragging.value = false;
    guidelineStyle.value.display = 'none';
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
    guidelineStyle.value.display = 'none';

    if (!e.dataTransfer) return;

    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data.scheduleId) {
        moveSchedule(data.scheduleId, dragOverTime.value);
      }
    } catch (error) {
      console.error('Drop handling error:', error);
    }
  };

  // Emit 이벤트 수신을 위한 메서드 추가
  const handleResizeStart = () => {
    isResizing.value = true;
  };

  const handleResizeEnd = () => {
    isResizing.value = false;
    guidelineStyle.value.display = 'none';
  };

  const handleResizeMove = (position: number) => {
    resizeGuidelinePosition.value = position;
    guidelineStyle.value = {
      top: `${position}px`,
      height: '2px',
      display: 'block',
    };
  };
</script>

<style scoped>
  .time-table {
    width: 25rem;
    height: 100%;
    background-color: #faf9ff;
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
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  .time-table__body {
    border-top: dashed 0.1px #00000020;
    position: relative;
    height: calc(24 * 12rem); /* 24시간 * (6rem * 2) */
  }

  .time-slots {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: grid;
    grid-template-rows: repeat(48, 6rem); /* 30분 단위 48칸, 각각 6rem */
  }

  .schedule-blocks {
    padding: 100px;
  }

  .drag-guideline {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px; /* 줄 형태로 변경 */
    background-color: #3b82f6; /* 실선으로 변경 */
    pointer-events: none;
    z-index: 10;
  }

  /* 시간 표시를 위한 레이블 추가 */
  .drag-guideline::after {
    content: attr(data-time);
    position: absolute;
    right: 100%;
    top: -10px;
    background-color: #3b82f6;
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.75rem;
  }
</style>
