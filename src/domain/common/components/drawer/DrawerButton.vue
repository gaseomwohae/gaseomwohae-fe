<script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const props = defineProps({
    text: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
    routeName: {
      type: String,
      required: true,
    },
    isCollapsed: {
      type: Boolean,
      default: false
    }
  });
  const emit = defineEmits(['click']);
  console.log(props.src);
  const isCurrentRoute = computed(() => {
    return route.name === props.routeName;
  });
</script>

<template>
  <button 
    class="drawer-button" 
    :class="{ 
      'active': isCurrentRoute,
      'collapsed': isCollapsed 
    }" 
    @click="emit('click')"
  >
    <img :src="`/src/assets/icons/${props.src}.png`" :alt="`${props.src}`" />
    <span v-show="!isCollapsed">{{ props.text }}</span>
  </button>
</template>

<style scoped>
.drawer-button {
  width: 100%;
  height: 40px;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* collapsed 상태일 때 중앙 정렬 */
.drawer-button.collapsed {
  justify-content: center;
}

.drawer-button img {
  transition: all 0.3s ease;
}

.drawer-button:hover {
  background-color: #faf9ff;
}

.drawer-button.active {
  background-color: #faf9ff;
}

img {
  width: 20px;
  height: 20px;
}

span {
  font-family: 'NanumGothic';
  font-size: 14px;
  color: #000;
  font-weight: bold;
}
</style>
