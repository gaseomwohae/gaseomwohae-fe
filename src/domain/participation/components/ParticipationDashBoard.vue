<script setup lang="ts">
  import ParticipationProfile from './ParticipationProfile.vue';
  import { ref, computed } from 'vue';
  import DropDownItem from '../../common/components/DropDownItem.vue';
  import AcceptLottie from '@/domain/common/components/AcceptLottie.vue';
  import Modal from '@/domain/home/components/Modal.vue';
  import Button from '@/domain/common/components/Button.vue';
  import InputField from '@/domain/auth/components/InputField.vue';
  import { useTripStore } from '@/stores/tripStore';
  import { storeToRefs } from 'pinia';

  const tripStore = useTripStore();
  const { participantList } = storeToRefs(tripStore);

  const isOpen = ref(false);
  const lottieAnimation = ref<any>(null);
  const lottieTitle = ref('Default Title');
  const selectedParticipantId = ref<number | null>(null);
  const showInviteModal = ref(false);
  const showKickModal = ref(false);

  const modalHeader = ref('새로운 멤버를 초대해주세요.');

  const onMenuClick = () => {
    isOpen.value = !isOpen.value;
  };

  const showAnimation = () => {
    lottieAnimation.value.showAnimation();
  };

  const onSelectItem = (boolean: boolean) => {
    isOpen.value = false;
    if (boolean) {
      showInviteModal.value = true;
    } else {
      showKickModal.value = true;
    }
  };

  const handleParticipantSelect = (id: number) => {
    console.log('Selected participant for removal:', id);
    selectedParticipantId.value = id;
  };

  const handleKickClose = () => {
    if (selectedParticipantId.value !== null) {
      console.log('Current participant list:', participantList.value);
      console.log('Attempting to remove participant ID:', selectedParticipantId.value);
      
      const updatedList = participantList.value.filter(participant => {
        const keep = participant.id !== selectedParticipantId.value;
        console.log(`Participant ${participant.id}: ${keep ? 'keeping' : 'removing'}`);
        return keep;
      });
      
      console.log('Updated participant list:', updatedList);
      tripStore.setParticipantList(updatedList);
      console.log('Store updated with new list');
      
      selectedParticipantId.value = null;
    }
    showKickModal.value = false;
    showAnimation();
    lottieTitle.value = '추방이 완료되었습니다.';
  };

  const handleInviteClose = () => {
    showInviteModal.value = false;
    showAnimation();
    lottieTitle.value = '초대가 완료되었습니다.';
  };

  const handleKickModalClose = () => {
    showKickModal.value = false;
    selectedParticipantId.value = null;
  };

  const handleInviteModalClose = () => {
    showInviteModal.value = false;
  };

  
</script>

<template>
  <div>
    <Modal 
      v-if="showKickModal" 
      header="추방할 멤버를 선택해주세요."
      @close="handleKickModalClose"
    >
      <template #body>
        <div class="participation-modal-layout">
          <ParticipationProfile
            v-for="participant in participantList"
            :key="participant.id"
            :clickable="true"
            :participant="participant"
            :selected="participant.id === selectedParticipantId"
            @click="handleParticipantSelect(participant.id)"
          />
        </div>
      </template>
      <template #footer>
        <Button 
          @click="handleKickClose" 
          value="추방하기" 
          backgroundColor="#FC0E29"
          :disabled="selectedParticipantId === null"
        />
      </template>
    </Modal>
  </div>

  <div>
    <Modal 
      v-if="showInviteModal" 
      :header="modalHeader"
      @close="handleInviteModalClose"
    >
      <template #body>
        <InputField 
          id="modal-input" 
          placeholder="이메일을 입력해주세요." 
          type="email"
        />
      </template>
      <template #footer>
        <Button 
          @click="handleInviteClose" 
          value="초대하기"
        />
      </template>
    </Modal>
  </div>

  <div class="participation-dash-outside-layout">
    <AcceptLottie ref="lottieAnimation" :title="lottieTitle" />
    <div class="participation-dash-menu-layout">
      <img src="/src/assets/icons/menu.png" @click="onMenuClick" />
      <transition name="fade">
        <div v-show="isOpen" class="drop-down-item-container">
          <DropDownItem text="초대하기" @selectItem="onSelectItem(true)" />
          <DropDownItem id="app" text="추방하기" @selectItem="onSelectItem(false)" />
        </div>
      </transition>
    </div>

    <div class="participation-dash-board-layout">
      <ParticipationProfile
        v-for="participant in participantList"
        :key="participant.id"
        :participant="participant"
      />
    </div>
  </div>
</template>

<style scoped>
  img {
    width: 48px;
    height: 48px;
  }

  img:hover {
    cursor: pointer;
  }

  .participation-dash-outside-layout {
    background-color: white;
    height: 100%;
    width: 100%;
    border-radius: 20px;
    padding: 30px 100px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: end;
  }

  .participation-dash-board-layout {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    gap: 60px;
  }

  .drop-down-item-container {
    background-color: white;
    position: absolute;
    top: 30%;
    transform: translate(-80%, -60px);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 250px;
    opacity: 1;
    transition:
      opacity 0.2s ease-in-out,
      transform 0.2s ease-in-out;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition:
      opacity 0.2s ease-in-out,
      transform 0.2s ease-in-out;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translate(-80%, -90px);
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
    transform: translate(-80%, -60px);
  }

  .participation-modal-layout {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
</style>
