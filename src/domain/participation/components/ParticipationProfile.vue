<!-- src/domain/participation/components/ParticipationProfile.vue -->
<script setup lang="ts">
  import { ref, defineEmits, defineProps, type PropType } from 'vue';
  import type { Participant } from '@/domain/common/model/Participant.type';
  const emit = defineEmits(['select']);

  const props = defineProps({
    clickable: Boolean,
    participant: Object as PropType<Participant>,
    selected: Boolean,
  });

  console.log(props.participant);

  const isSelected = ref(false);

  const toggleSelect = () => {
    if (props.clickable) {
      isSelected.value = !isSelected.value;
      emit('select', isSelected.value);
    }
  };
</script>

<template>
  <div 
    class="participation-profile-layout" 
    :class="{ 
      'clickable': clickable, 

    }"
  >
    <img
      src="/src/assets/icons/profile.png"
      :class="{       'selected': selected , clickable: clickable }"
    />
    <div class="participation-profile-name">{{ props.participant?.name }}</div>
  </div>
</template>

<style scoped>
  .participation-profile-layout {
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  .participation-profile-name {
    font-size: 24px;
    font-weight: 800;
  }
  img {
    border: 4px solid transparent; /* 기본 테두리 */
  }
  .selected {
    border-radius: 50%;
    color: #fc0e29;
    border: 4px solid #fc0e29; /* 선택된 경우 파란색 테두리 */
  }

  .clickable {
    cursor: pointer; /* 클릭 가능할 때 커서 변경 */
  }


</style>
