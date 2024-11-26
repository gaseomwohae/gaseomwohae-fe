<template>
  <div class="schedule-block" :style="scheduleStyle" draggable="true" @dragstart="handleDragStart">
    <div
      class="schedule-block__resize-handle schedule-block__resize-handle--top"
      @mousedown.stop.prevent="handleMouseDown('top')"
    ></div>
    <div class="schedule-block__content">
      <PlaceSummary :place="props.schedule.place" />
    </div>
    <div
      class="schedule-block__resize-handle schedule-block__resize-handle--bottom"
      @mousedown.stop.prevent="handleMouseDown('bottom')"
    ></div>
  </div>
</template>

<script setup lang="ts">
  import { useScheduleStore } from '@/stores/schedule.store';
  import { computed, ref, watch } from 'vue';
  import type { ScheduleItem } from '../model/travel.type';
  import { minutesToTime, remToPx, timeToMinutes } from '../utils/time.util';
  import PlaceSummary from './PlaceSummary.vue';

  const MINUTES_PER_SLOT = 30;
  const SLOT_HEIGHT = remToPx(8); // px (6rem)
  const MIN_DURATION = MINUTES_PER_SLOT; // 최소 30분
  const MAX_DURATION = 24 * 60; // 최대 24시간

  const props = defineProps<{
    schedule: ScheduleItem;
  }>();

  const emit = defineEmits(['update-start-time', 'update-end-time']);

  const scheduleStore = useScheduleStore();

  const isResizing = ref<boolean>(false);
  const resizeType = ref<'top' | 'bottom' | null>(null);

  const newStartTime = ref(props.schedule.startTime);
  const newEndTime = ref(props.schedule.endTime);

  // props.schedule의 변경을 감지하여 newStartTime과 newEndTime을 업데이트
  watch(
    () => props.schedule,
    (newSchedule) => {
      newStartTime.value = newSchedule.startTime;
      newEndTime.value = newSchedule.endTime;
    },
    { deep: true },
  );

  const handleDragStart = () => {
    scheduleStore.setDraggingSchedule(props.schedule);
  };

  const handleMouseDown = (type: 'top' | 'bottom') => {
    isResizing.value = true;
    resizeType.value = type;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.value) return;

    const newTime = calculateTimeFromMousePosition(e);

    if (resizeType.value === 'top') {
      newStartTime.value = newTime;
    } else {
      newEndTime.value = newTime;
    }

    const duration = timeToMinutes(newEndTime.value) - timeToMinutes(newStartTime.value);

    if (duration < MIN_DURATION || duration > MAX_DURATION) {
      return;
    }
  };

  const handleMouseUp = () => {
    if (!isResizing.value) return;

    if (resizeType.value === 'top') {
      emit('update-start-time', {
        ...props.schedule,
        startTime: newStartTime.value,
        endTime: newEndTime.value,
      });
    } else if (resizeType.value === 'bottom') {
      emit('update-end-time', {
        ...props.schedule,
        startTime: newStartTime.value,
        endTime: newEndTime.value,
      });
    }

    isResizing.value = false;
    resizeType.value = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const calculateTimeFromMousePosition = (e: MouseEvent): string => {
    const scheduleBody = (e.target as HTMLElement)
      .closest('.time-table__body')
      ?.getBoundingClientRect();

    if (!scheduleBody) {
      console.error('scheduleBody is null');
      return props.schedule.startTime;
    }

    const timeSlot = (e.target as HTMLElement)
      .closest('.time-table__body')
      ?.querySelector('.time-slot')
      ?.getBoundingClientRect();

    if (!timeSlot) {
      console.error('timeSlot is null');
      return props.schedule.startTime;
    }

    const relativeY = e.clientY - scheduleBody.top;
    const slotHeight = timeSlot.height;
    const slots = Math.round(relativeY / slotHeight);
    const minutes = Math.max(0, Math.min(24 * 60 - MINUTES_PER_SLOT, slots * MINUTES_PER_SLOT));

    return minutesToTime(minutes);
  };

  const scheduleStyle = computed(() => {
    const startPosition = calculatePosition(newStartTime.value);
    const endPosition = calculatePosition(newEndTime.value);
    const height = endPosition - startPosition;

    return {
      top: `${startPosition + 0.5}px`,
      height: `${height - 1.1}px`,
    };
  });

  const calculatePosition = (time: string): number => {
    return (timeToMinutes(time) / MINUTES_PER_SLOT) * SLOT_HEIGHT;
  };
</script>

<style scoped>
  .schedule-block {
    background-color: #ffffff;
    border-radius: 1rem;
    cursor: grab;
    user-select: none;
    left: 10%;
    position: absolute;
    margin: 0 1rem;
    width: calc(100% - 4.3rem);
  }

  .schedule-block:hover {
    border: 1px solid #00000020;
  }

  .schedule-block__resize-handle {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 1.3rem;
    cursor: row-resize;
    background-color: transparent;
    z-index: 2;
  }

  .schedule-block__resize-handle::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 20%;
    height: 0.5rem;
    border-radius: 1rem;
    margin: 0 auto;
    background-color: rgb(223, 223, 223);
    opacity: 0;
    transition: opacity 0.5s;
  }

  .schedule-block:hover .schedule-block__resize-handle::after {
    opacity: 1;
  }

  .schedule-block__resize-handle--top {
    top: 0rem;
  }

  .schedule-block__resize-handle--bottom {
    bottom: -0.5rem;
  }

  .schedule-block__content {
    background-color: #fff;
    border-radius: 1.5rem;
    padding: 1rem;
  }
</style>
