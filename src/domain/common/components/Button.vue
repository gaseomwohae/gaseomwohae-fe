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
    cursor: pointer;
    border: none;
  }
</style>
