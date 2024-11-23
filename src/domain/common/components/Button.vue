<template>
  <button @click="onClick">{{ value }}</button>
</template>

<script setup lang="ts">
  interface ButtonProps {
    value?: string;

    backgroundColor?: string;
    fontColor?: string;
    fontSize?: string;
    height?: string;
  }

  const props = withDefaults(defineProps<ButtonProps>(), {
    value: 'button',
    
    backgroundColor: '#346aff',
    fontColor: '#fff',
    fontSize: '16px',
    height: '50px',
  });

  const emit = defineEmits<{
    (e: 'click'): void;
  }>();

  const onClick = (): void => {
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
