<!-- src/domain/home/components/Modal.vue -->
<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  const props = defineProps({
    header: String,
  });

  const emit = defineEmits<{
    close: [];
  }>();
</script>

<template>
  <div class="modal-background" @click.self="emit('close')">
    <div class="modal-container">
      <div class="modal-header">
        <span class="modal-header-text">{{ header }}</span>
        <img 
          src="/src/assets/icons/modal_close.png" 
          @click="emit('close')"
          class="close-button"
        />
      </div>
      <div class="modal-body">
        <slot name="body"></slot>
      </div>
      <div class="modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-container {
    width: fit-content;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    border-radius: 10px;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .modal-default-button {
    float: right;
  }

  .modal-header-text {
    font-size: 24px;
    font-weight: bold;
  }

  .close-button {
    width: 30px;
    height: 30px;
  }
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 50px;
  }

  .close-button:hover {
    cursor: pointer;
  }
</style>
