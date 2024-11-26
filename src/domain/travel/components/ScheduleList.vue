<template>
  <div class="schedule-list">
    <div class="time-table__header font-xl font-extra-bold">
      <button
        class="date-change-button"
        @click="changeDate('prev')"
        :disabled="new Date(scheduleDate) <= startDate"
      >
        이전
      </button>
      <span class="date-text">{{ scheduleDate }}</span>
      <button
        class="date-change-button"
        @click="changeDate('next')"
        :disabled="new Date(scheduleDate) >= endDate"
      >
        다음
      </button>
    </div>
    <div class="time-table">
      <div class="time-table__body" @dragover="handleDragOver" @drop="handleDrop">
        <div v-for="time in TIME_SLOTS" :key="time" class="time-slot">
          <TimeSlot :time="time" />
        </div>
        <div class="schedule-blocks">
          <div v-for="schedule in filteredScheduleList?.schedule" :key="schedule.scheduleId">
            <ScheduleBlock
              :schedule="schedule"
              @update-start-time="updateTime"
              @update-end-time="updateTime"
            />
            <div
              class="schedule-block-delete"
              :style="{
                top: `calc(${(timeToMinutes(schedule.startTime) / 30) * 8}rem + 0.5rem)`,
              }"
              @click="deleteSchedule(schedule.scheduleId)"
            >
              x
            </div>
          </div>
        </div>
        <div
          v-if="isDragging"
          class="schedule-preview"
          :class="{ 'schedule-preview--overlap': isOverlapping }"
          :style="schedulePreviewStyle"
        >
          <div
            class="schedule-preview__content"
            :class="{ 'schedule-preview__content--overlap': isOverlapping }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useScheduleStore } from '@/stores/schedule.store';
  import { computed, onMounted, ref, watch } from 'vue';
  import type { DailySchedule, ScheduleItem } from '../model/travel.type';
  import { minutesToTime, remToPx, TIME_SLOTS, timeToMinutes } from '../utils/time.util';
  import ScheduleBlock from './ScheduleBlock.vue';
  import TimeSlot from './TimeSlot.vue';
  import { useTripInfoStore } from '@/stores/tripStore';

  const scheduleStore = useScheduleStore();
  const tripInfoStore = useTripInfoStore();

  const scheduleDate = ref(tripInfoStore.tripInfo?.trip.startDate ?? '');
  const scheduleList = computed(() => scheduleStore.scheduleList);

  // 여행 날짜 범위
  const startDate = computed(() => new Date(tripInfoStore.tripInfo?.trip.startDate ?? ''));
  const endDate = computed(() => new Date(tripInfoStore.tripInfo?.trip.endDate ?? ''));

  // 날짜를 변경하는 함수
  const changeDate = (direction: 'prev' | 'next') => {
    console.log('changeDate', direction);
    const currentDate = new Date(scheduleDate.value);
    console.log('currentDate', currentDate);
    if (direction === 'prev') {
      currentDate.setDate(currentDate.getDate() - 1);scheduleDate.value = formatedDate(currentDate);
      scheduleDate.value = currentDate.toISOString().split('T')[0];
    } else if (direction === 'next') {
      currentDate.setDate(currentDate.getDate() + 1);scheduleDate.value = formatedDate(currentDate);
      scheduleDate.value = currentDate.toISOString().split('T')[0];
    }
    console.log('scheduleDate', scheduleDate.value);
    // 변경된 날짜가 여행 날짜 범위 내에 있는지 확인
    // if (currentDate >= startDate.value && currentDate <= endDate.value) {
    //   scheduleDate.value = currentDate.toISOString().split('T')[0];
    // }
  };

  // scheduleList의 변화를 감지하여 콘솔에 출력
  watch(
    scheduleList,
    (newScheduleList) => {
      console.log('Updated schedule list:', newScheduleList);
    },
    { deep: true },
  );

  const formatedDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

  // scheduleDate에 일치하는 scheduleList를 필터링
  const filteredScheduleList = computed(() => {
    console.log('filtered scheduleDate', scheduleDate.value);
    const filteredScheduleList = scheduleStore.scheduleList.find(
      (dailySchedule) => dailySchedule.date === scheduleDate.value,
    );
    console.log('filteredScheduleList', filteredScheduleList);

    return filteredScheduleList;
  });

  // scheduleList의 변화를 감지하여 콘솔에 출력
  watch(filteredScheduleList, (newList) => {
    console.log('Filtered Schedule List:', newList);
  });

  // Constants
  const MINUTES_PER_SLOT = 30;
  const SLOT_HEIGHT = remToPx(8);

  // Drag and drop state
  const isDragging = ref(false);
  const dragOverTime = ref('');
  const schedulePreviewStyle = ref({});
  const isOverlapping = ref(false);
  const draggingSchedule = computed(() => scheduleStore.draggingSchedule);
  const draggingScheduleDuration = computed(() => scheduleStore.draggingScheduleDuration);

  onMounted(async () => {
    //Todo: 적당한 위치로 옮기기 새로고침마다 초기화됨.
  });

  // 스케줄 시간 업데이트
  const updateTime = (updatedSchedule: ScheduleItem) => {
    const targetSchedule: ScheduleItem | undefined = scheduleList.value
      .flatMap((dailySchedule) => dailySchedule.schedule)
      .find((schedule) => schedule.scheduleId === updatedSchedule.scheduleId);

    console.log('targetSchedule', targetSchedule);

    if (
      !targetSchedule ||
      checkOverlap(updatedSchedule.scheduleId, updatedSchedule.startTime, updatedSchedule.endTime)
    ) {
      return false;
    }

    scheduleStore.updateSchedule(updatedSchedule);
  };

  // 특정 스케줄이 다른 스케줄과 겹치는지 체크
  const checkOverlap = (id: number, startTime: string, endTime: string): boolean => {
    if (!startTime || !endTime || !id) {
      return false;
    }

    const newStart = timeToMinutes(startTime);
    const newEnd = timeToMinutes(endTime);

    return filteredScheduleList.value.schedule.some((s) => {
      if (id === s.scheduleId) {
        return false;
      }

      const existingStart = timeToMinutes(s.startTime);
      const existingEnd = timeToMinutes(s.endTime);

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

    if (!e.currentTarget || !draggingSchedule.value) return;
    console.log(draggingScheduleDuration.value);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

    // 타임테이블 시작점으로부터 마우스까지의 거리
    const timeTableY = e.clientY - rect.top;

    // 마우스가 슬롯 중간을 가리키도록함 (원래 )
    const adjustedY = timeTableY - SLOT_HEIGHT / 2;

    // 몇 번째 슬롯인지 계산 (30분 단위)
    let totalSlots = Math.round(adjustedY / SLOT_HEIGHT);

    // 슬롯 범위 검사
    if (totalSlots < 0) {
      totalSlots = 0;
    } else if (totalSlots > 48 - draggingScheduleDuration.value / MINUTES_PER_SLOT) {
      totalSlots = 48 - draggingScheduleDuration.value / MINUTES_PER_SLOT;
    }

    // 슬롯 갯수로부터 총 몇분인지 계산
    const adjustedMinutes = Math.max(0, totalSlots * MINUTES_PER_SLOT);

    dragOverTime.value = minutesToTime(adjustedMinutes);

    // 겹침 여부 확인
    isOverlapping.value = checkOverlap(
      draggingSchedule.value?.scheduleId ?? 0,
      dragOverTime.value,
      minutesToTime(timeToMinutes(dragOverTime.value) + draggingScheduleDuration.value ?? 0),
    );

    schedulePreviewStyle.value = {
      top: `${totalSlots * SLOT_HEIGHT}px`,
      height: `${((draggingScheduleDuration.value || 30) / 30) * SLOT_HEIGHT}px`,
      display: 'block',
    };
  };

  const moveSchedule = (id: number, newStartTime: string) => {
    const schedule = filteredScheduleList.value?.schedule.find((s) => s.scheduleId === id);
    if (!schedule) {
      console.log('Schedule not found');
      return false;
    }

    console.log('draggingSchedule', schedule.scheduleId);

    const startMinutes = timeToMinutes(newStartTime);
    const duration = timeToMinutes(schedule.endTime) - timeToMinutes(schedule.startTime);
    const newEndTime = minutesToTime(startMinutes + duration);

    if (checkOverlap(id, newStartTime, newEndTime)) {
      console.log('Overlap detected');
      return false;
    }

    console.log('moveSchedule', schedule.scheduleId);

    schedule.startTime = newStartTime;
    schedule.endTime = newEndTime;
    scheduleStore.updateSchedule(schedule);
    return true;
  };

  const deleteSchedule = (id: number) => {
    scheduleStore.deleteSchedule(id);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    isDragging.value = false;

    if (!e.dataTransfer || !draggingSchedule.value) return;

    // 기존 스케줄을 움직이는거라면
    if (draggingSchedule.value?.scheduleId) {
      moveSchedule(draggingSchedule.value.scheduleId, dragOverTime.value);
      scheduleStore.deleteDraggingSchedule();
    }

    // 새로운 스케줄 추가
    else {
      const startTime = dragOverTime.value;
      const endTimeMinutes = timeToMinutes(startTime) + MINUTES_PER_SLOT;
      const endTime = minutesToTime(endTimeMinutes);
      const newSchedule: ScheduleItem = {
        scheduleId: 0,
        startTime,
        endTime,
        place: draggingSchedule.value.place,
        date: scheduleDate.value,
      };

      // 겹치지 않을 경우에만 추가
      if (!checkOverlap(newSchedule.scheduleId, startTime, endTime)) {
        scheduleStore.addSchedule(newSchedule);
        scheduleStore.deleteDraggingSchedule();
      }
    }
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


</script>

<style scoped>
  .schedule-list {
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
    display: flex;
    align-items: center;
    justify-content: center;
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

  .date-change-button {
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .date-change-button:disabled {
    background-color: #cbd5e1;
    cursor: not-allowed;
  }
  .date-text {
    margin: 0 1rem;
  }
</style>
