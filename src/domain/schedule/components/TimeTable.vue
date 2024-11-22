<template>
  <div class="schedule-container">
    <div class="time-table__header font-xl font-extra-bold">2024년 11월 21일</div>
    <div class="time-table">
      <div
        class="time-table__body"
        @dragstart="handleDragStart"
        @dragover="handleDragOver"
        @drop="handleDrop"
      >
        <div v-for="time in times" :key="time" class="time-slot">
          <TimeSlot :time="time" />
        </div>
        <div class="schedule-blocks">
          <div v-for="schedule in schedules" :key="schedule.id">
            <ScheduleBlock
              v-bind="schedule"
              :store="schedule.store"
              :id="schedule.id"
              @update-start-time="updateStartTime"
              @update-end-time="updateEndTime"
              @move-schedule="moveSchedule"
            />
            <div
              class="schedule-block-delete"
              :style="{
                top: `calc(${(timeToMinutes(schedule.startTime) / 30) * 8}rem + 0.5rem)`,
              }"
              @click="deleteSchedule(schedule.id)"
            >
              x
            </div>
          </div>
        </div>
        <div
          v-if="isDragging || isResizing"
          class="schedule-preview"
          :class="{ 'schedule-preview--overlap': isOverlapping }"
          :style="{
            top: guidelineStyle.top,
            height: `${(previewDuration / 30) * 8}rem`,
            display: guidelineStyle.display,
          }"
        >
          <div
            class="schedule-preview__content"
            :class="{ 'schedule-preview__content--overlap': isOverlapping }"
          >
            {{ isOverlapping ? '일정이 겹칩니다' : '드래그 중...' }}
          </div>
        </div>
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
  const SLOT_HEIGHT = 112; // 6rem = 84px

  // State
  const times = ref(generateTimeSlots());
  const schedules = ref<ScheduleTime[]>([]);

  // Drag and drop state
  const isResizing = ref(false);
  const isDragging = ref(false);
  const dragOverTime = ref('');
  const guidelineStyle = ref({});

  // 새로운 상태 추가
  const previewDuration = ref(30); // 기본값 30분

  // 전역 상태에 currentDragDuration 추가
  const currentDragDuration = ref(30);

  // 겹침 상태를 저장할 ref 추가
  const isOverlapping = ref(false);

  // dragData에서 현재 드래그 중인 스케줄의 ID를 가져오기 위한 상태 추가
  const currentDragId = ref<number | null>(null);

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
    if (!e.currentTarget) return '00:00';

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

    // 마우스의 Y 위치에서 타임테이블의 상단 위치를 빼서 상대적인 위치 계산
    const relativeY = e.clientY - rect.top;

    // 30분 단위로 반올림
    const totalSlots = Math.round(relativeY / SLOT_HEIGHT);
    const totalMinutes = totalSlots * MINUTES_PER_SLOT;

    // 시간 범위 제한 (0시 ~ 23시 59분)
    if (totalMinutes < 0) return '00:00';
    if (totalMinutes >= 24 * 60) return '23:30';

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  // dragstart 이벤트 핸들러 추가
  const handleDragStart = (e: DragEvent) => {
    console.log('dragstart target:', e.target);
    const scheduleId = (e.target as HTMLElement).getAttribute('data-schedule-id');
    console.log('dragstart scheduleId:', scheduleId);

    if (scheduleId) {
      currentDragId.value = Number(scheduleId);
      const schedule = schedules.value.find((s) => s.id === Number(scheduleId));
      if (schedule) {
        currentDragDuration.value =
          timeToMinutes(schedule.endTime) - timeToMinutes(schedule.startTime);
        previewDuration.value = currentDragDuration.value;
      }
    }
  };

  const checkCurrentOverlap = (startTime: string): boolean => {
    const newStart = timeToMinutes(startTime);
    const newEnd = newStart + currentDragDuration.value;

    return schedules.value.some((schedule) => {
      // 현재 드래그 중인 블록은 겹침 체크에서 제외
      if (schedule.id === currentDragId.value) {
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

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    isDragging.value = true;

    if (!e.currentTarget) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const timeTableY = e.clientY - rect.top;

    const adjustedY = timeTableY - ((currentDragDuration.value / 30) * SLOT_HEIGHT) / 2;
    const totalSlots = Math.round(adjustedY / SLOT_HEIGHT);
    const adjustedMinutes = Math.max(0, totalSlots * MINUTES_PER_SLOT);

    dragOverTime.value = minutesToTime(adjustedMinutes);

    // 겹침 여부 확인
    isOverlapping.value = checkCurrentOverlap(dragOverTime.value);

    previewDuration.value = currentDragDuration.value;

    guidelineStyle.value = {
      top: `${totalSlots * 8}rem`,
      height: `${(currentDragDuration.value / 30) * 8}rem`,
      display: 'block',
    };
  };

  const moveSchedule = (id: number, newStartTime: string) => {
    console.log('moveSchedule called with id:', id, 'newStartTime:', newStartTime);

    const schedule = schedules.value.find((s) => s.id === id);
    if (!schedule) {
      console.log('Schedule not found');
      return false;
    }

    // 현재 duration 유지
    const duration = timeToMinutes(schedule.endTime) - timeToMinutes(schedule.startTime);
    const newEndTime = minutesToTime(timeToMinutes(newStartTime) + duration);

    console.log('Moving schedule:', {
      id,
      oldStart: schedule.startTime,
      oldEnd: schedule.endTime,
      newStart: newStartTime,
      newEnd: newEndTime,
    });

    if (checkOverlap(id, newStartTime, newEndTime)) {
      console.log('Overlap detected');
      return false;
    }

    schedule.startTime = newStartTime;
    schedule.endTime = newEndTime;
    return true;
  };

  const deleteSchedule = (id: number) => {
    schedules.value = schedules.value.filter((s) => s.id !== id);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    isDragging.value = false;

    if (!e.dataTransfer) return;

    try {
      const jsonStr = e.dataTransfer.getData('application/json');
      console.log('Drop data:', jsonStr);

      if (!jsonStr) return;

      const data = JSON.parse(jsonStr);
      console.log('Parsed data:', data);

      if (data.scheduleId) {
        console.log('Moving existing schedule:', data.scheduleId);
        moveSchedule(Number(data.scheduleId), dragOverTime.value);
      } else if (data.isNewSchedule) {
        // 새로운 스케줄 추가
        const startTime = dragOverTime.value;
        const endTimeMinutes = timeToMinutes(startTime) + data.duration;
        const endTime = minutesToTime(endTimeMinutes);

        // 새로운 스케줄 생성
        const newSchedule: ScheduleTime = {
          id: schedules.value.length + 1,
          startTime,
          endTime,
          store: data.store,
        };

        // 겹치지 않을 경우에만 추가
        if (!checkOverlap(newSchedule.id, startTime, endTime)) {
          schedules.value.push(newSchedule);
        }
      }
    } catch (error) {
      console.error('Drop error:', error);
    } finally {
      currentDragDuration.value = 30;
      currentDragId.value = null;
    }
  };
</script>

<style scoped>
  .schedule-container {
    display: flex;
    min-width: 25rem;
    width: 25rem;
    max-width: 25rem;
    flex-direction: column;
    height: 100%;
    background-color: #faf9ff;
    border-radius: 1.5rem;
  }

  .time-table__header {
    padding: 2rem;
    position: sticky;
    background-color: #ffffff;
    border-bottom: solid 0.1rem #00000020;

    user-select: none;
    border-radius: 1.5rem 1.5rem 0 0;
  }

  .time-table__body {
    border-top: dashed 0.1px #00000020;
    position: relative;
    height: calc(48 * 6rem);
  }

  .time-table {
    overflow: auto;
    border-radius: 0 0 1.5rem 1.5rem;
  }

  .time-slots {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: grid;
    grid-template-rows: repeat(48, 6rem);
  }

  .schedule-block-delete {
    position: absolute;
    right: 1rem;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(239, 68, 68, 0.8);
    color: white;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1rem;
    z-index: 2;
  }

  .schedule-block-delete:hover {
    background-color: rgb(239, 68, 68);
  }

  .schedule-preview {
    position: absolute;
    left: 3rem;
    right: 0.3rem;
    background-color: rgba(59, 130, 246, 0.2);
    border-radius: 0.5rem;
    pointer-events: none;
    z-index: 1;
    padding: 0.5rem;
    transition: background-color 0.2s ease;
  }

  .schedule-preview--overlap {
    background-color: rgba(239, 68, 68, 0.2);
  }

  .schedule-preview__content {
    height: 100%;
    background-color: rgba(59, 130, 246, 0.1);
    border: 2px dashed #3b82f6;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #3b82f6;
    font-size: 0.875rem;
    transition: all 0.2s ease;
  }

  .schedule-preview__content--overlap {
    background-color: rgba(239, 68, 68, 0.1);
    border-color: #ef4444;
    color: #ef4444;
  }
</style>
