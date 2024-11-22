<template>
  <div
    class="schedule-block"
    :style="blockStyle"
    :draggable="!isResizing"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    <div class="resize-handle top" @mousedown.stop.prevent="startResize('top')"></div>
    <div class="schedule-content"></div>
    <div class="resize-handle bottom" @mousedown.stop.prevent="startResize('bottom')"></div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { minutesToTime, timeToMinutes } from '../utils/timeUtils';

  const MINUTES_PER_SLOT = 30;
  const SLOT_HEIGHT = 6; // px (6rem)
  const MIN_DURATION = MINUTES_PER_SLOT; // 최소 30분
  const MAX_DURATION = 24 * 60; // 최대 24시간

  const props = defineProps<{
    id: number;
    startTime: string;
    endTime: string;
  }>();

  const emit = defineEmits([
    'update-start-time',
    'update-end-time',
    'move-schedule',
    'resize-start',
    'resize-end',
    'resize-move',
  ]);

  const isResizing = ref(false);
  const resizeType = ref<'top' | 'bottom' | null>(null);

  const handleDragStart = (e: DragEvent) => {
    if (!e.currentTarget || !e.dataTransfer) return;

    const blockElement = e.currentTarget as HTMLElement;
    blockElement.setAttribute('dragging', 'true');

    // 마우스와 블록 상단과의 거리 계산
    const blockRect = blockElement.getBoundingClientRect();
    const mouseOffset = e.clientY - blockRect.top;
    blockElement.setAttribute('data-mouse-offset', mouseOffset.toString());

    // 현재 일정의 duration 계산
    const duration = timeToMinutes(props.endTime) - timeToMinutes(props.startTime);

    e.dataTransfer.setData(
      'application/json',
      JSON.stringify({
        scheduleId: props.id,
        duration: duration,
      }),
    );
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = (e: DragEvent) => {
    if (!e.currentTarget) return;

    const blockElement = e.currentTarget as HTMLElement;
    blockElement.removeAttribute('dragging');
    blockElement.removeAttribute('data-mouse-offset');
  };

  // rem을 px로 변환하는 함수 추가
  const remToPx = (rem: number): number => {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  };

  // 마우스 위치를 시간으로 변환 - 30분 단위로 즉시 스냅
  const calculateTimeFromMousePosition = (e: MouseEvent): string => {
    const tableRect = (e.target as HTMLElement)
      .closest('.time-table__body')
      ?.getBoundingClientRect();
    if (!tableRect) return props.startTime;

    const relativeY = e.clientY - tableRect.top;
    const slotHeightPx = remToPx(SLOT_HEIGHT);

    // 바로 30분 단위로 반올림
    const slots = Math.round(relativeY / slotHeightPx);
    const minutes = slots * MINUTES_PER_SLOT;

    // 0시부터 24시 사이로 제한
    const limitedMinutes = Math.max(0, Math.min(24 * 60 - MINUTES_PER_SLOT, minutes));

    return minutesToTime(limitedMinutes);
  };

  // 리사이징 핸들러 단순화
  const startResize = (type: 'top' | 'bottom') => {
    isResizing.value = true;
    resizeType.value = type;
    emit('resize-start');

    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.value) return;

      const newTime = calculateTimeFromMousePosition(e);
      const newMinutes = timeToMinutes(newTime);

      if (resizeType.value === 'top') {
        const endMinutes = timeToMinutes(props.endTime);
        if (endMinutes - newMinutes < MIN_DURATION) return;
        if (endMinutes - newMinutes > MAX_DURATION) return;
        emit('update-start-time', props.id, newTime);
      } else {
        const startMinutes = timeToMinutes(props.startTime);
        if (newMinutes - startMinutes < MIN_DURATION) return;
        if (newMinutes - startMinutes > MAX_DURATION) return;
        emit('update-end-time', props.id, newTime);
      }
    };

    const handleMouseUp = () => {
      isResizing.value = false;
      resizeType.value = null;
      emit('resize-end');
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const blockStyle = computed(() => {
    const startPosition = calculatePosition(props.startTime);
    const endPosition = calculatePosition(props.endTime);
    const height = endPosition - startPosition;

    return {
      top: `${startPosition + 1}rem`,
      height: `${height - 2}rem`,
    };
  });

  const calculatePosition = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    return (totalMinutes / MINUTES_PER_SLOT) * SLOT_HEIGHT;
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
    width: calc(100% - 4.5rem);
  }

  /* 실제 드래그 영역 */
  .resize-handle {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 1.3rem;
    cursor: row-resize;
    background-color: transparent;
    z-index: 2;
  }

  /* 드래그 영역 표시(실제 영역보다 작음) */
  .resize-handle::after {
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

  .schedule-block:hover .resize-handle::after {
    opacity: 1;
  }

  .resize-handle.top {
    top: 0rem;
  }

  .resize-handle.bottom {
    bottom: -0.5rem;
  }

  /* 리사이징 중일 때는 드래그 비활성화 */
  .schedule-block[data-resizing='true'] {
    cursor: row-resize;
  }
</style>
