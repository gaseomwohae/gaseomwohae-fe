<template>
  <div class="schedule-block" :style="blockStyle" @mousedown="startResize"></div>
</template>

<script setup lang="ts">
  import type { CSSProperties } from 'vue';
  import { computed, ref, toRefs } from 'vue';

  const props = defineProps<{
    id: number;
    startTime: string;
    endTime: string;
  }>();

  const { id, startTime, endTime } = toRefs(props);

  const blockStyle = computed<CSSProperties>(() => {
    const startHour = parseInt(startTime.value.split(':')[0]);
    const startMinute = parseInt(startTime.value.split(':')[1]);
    const endHour = parseInt(endTime.value.split(':')[0]);
    const endMinute = parseInt(endTime.value.split(':')[1]);
    const startPosition = Math.floor((startHour * 60 + startMinute) / 30) + 1;
    const endPosition = Math.ceil((endHour * 60 + endMinute) / 30) + 1;

    return {
      gridRowStart: startPosition,
      gridRowEnd: endPosition,
      position: 'absolute',
      height: `${(endPosition - startPosition) * 6 - 0.1}rem`,
      top: '0',
      left: '3.7rem',
      right: '0',
      backgroundColor: '#ffffff',
      opacity: 0.8,
      borderRadius: '1.2rem',
    };
  });

  const isResizing = ref(false);
  const initialY = ref(0);

  const startResize = (event: MouseEvent) => {
    isResizing.value = true;
    initialY.value = event.clientY;

    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
  };

  const resize = (event: MouseEvent) => {};

  const stopResize = (event: MouseEvent) => {
    if (isResizing.value) {
      const deltaY = event.clientY - initialY.value;
      console.log(deltaY);
    }

    isResizing.value = false;
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResize);
  };
</script>

<style scoped></style>
