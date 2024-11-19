<script setup>
  import { ref, watch } from 'vue';

  const props = defineProps({
    type: {
      type: String,
      default: 'text',
    },
    id: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: true,
    },
    modelValue: {
      type: String,
      defualt: ' ',
    },
    label: {
      type: String,
    },
  });

  const inputValue = ref(props.modelValue);

  watch();

  const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="form-group">
    <label v-if="label">{{ label }}</label>
    <input
      :type="type"
      :id="id"
      :placeholder="placeholder"
      v-model="inputValue"
      :required="required"
      @input="emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<style scoped>
  input {
    width: 100%;
    height: 50px;
    border-radius: 10px;
    border: 1px solid #e0e0e0;
    font-size: 14px;
    font-family: 'NanumGothic';
    padding-left: 20px;
    box-sizing: border-box;
  }
  .form-group {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
  label {
    font-size: 12px;
    font-weight: bold;
  }
</style>
