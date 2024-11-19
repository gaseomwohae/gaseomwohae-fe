<script setup>

  const props = defineProps({
    text: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
  });
  const emit = defineEmits(['click']);
</script>

<template>
  <button class="drawer-button" @click="emit('click')">
    <img :src="`src/assets/icons/${props.src}.png`" :alt="`${props.icon}`" />
    <span>{{ props.text }}</span>
  </button>
</template> 

<style scoped>
  .drawer-button {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    padding: 10px 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .drawer-button img,
  .drawer-button span {
    transition: opacity 0.3s ease;
    opacity: 0.1;
  }


  .drawer-button img,
  .drawer-button span {
    opacity: 1;
  }
  
  .drawer-button:hover {
    background-color: #FAF9FF;
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
