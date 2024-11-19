<template>
  <button @click="onClick">{{ value }}</button>
</template>

<script setup>
  defineProps({
    value: {
      type: String,
      default: 'button',
    },
    backgroundColor: {
      type: String,
      default: '#346aff',
    },
    fontColor: {
      type: String,
      default: '#fff',
    },
    fontSize: {
      type: String,
      default: '16px',
    },
    height: {
      type: String,
      default: '50px',
    },
  });

  const emit = defineEmits(['click']);

  const onClick = () => {
    emit('click');
  };
</script>

<style scoped>
  button {
    width: 100%;
    height: 50px;
    border-radius: 10px;
    background-color: v-bind(backgroundColor);
    color: v-bind(fontColor);
    font-size: 16px;
    font-family: 'NanumGothic';
    font-weight: bold;
    font-size: v-bind(fontSize);
    cursor: pointer;
    height: v-bind(height);
    border: none;
  }
</style>
