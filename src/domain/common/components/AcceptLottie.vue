<!-- src/components/LottieAnimation.vue -->
<template>
  <div class="toast-container" v-show="visible">
    <div ref="lottieContainer" class="lottie-container"></div>
    <div class="text-container">
      <p class="text-title">{{ props.title }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount, defineExpose } from 'vue';
  import lottie from 'lottie-web';

  const props = defineProps<{
    title: string;
  }>();

  const lottieContainer = ref<HTMLElement | null>(null);
  let animationInstance: any = null;

  const visible = ref(false);

  // 외부에서 호출할 수 있도록 메서드 노출
  defineExpose({
    showAnimation: () => {
      visible.value = true;
      if (animationInstance) {
        animationInstance.goToAndStop(0, true); // 애니메이션을 처음으로 되감기
        animationInstance.play(); // 애니메이션 시작
      }
    },
  });

  onMounted(() => {
    if (lottieContainer.value) {
      animationInstance = lottie.loadAnimation({
        container: lottieContainer.value,
        renderer: 'svg',
        loop: false, // 애니메이션이 끝나면 사라지도록 설정
        autoplay: false, // 자동 재생 비활성화
        path: '/src/assets/lottie/accept.json', // JSON 파일 경로
      });

      animationInstance.addEventListener('complete', () => {
        visible.value = false;
        animationInstance.stop();
      });
    }
  });

  onBeforeUnmount(() => {
    if (animationInstance) {
      animationInstance.destroy();
    }
  });
</script>

<style scoped>
  .lottie-container {
    width: 130px;
    height: 130px;
  }
  .toast-container {
    display: flex;
    flex-direction: row;
    position: fixed;
    top: 10px;
    right: 10px;
    height: fit-content;
    width: fit-content;
    padding-right: 30px;
    z-index: 1000; /* 다른 요소 위에 표시되도록 설정 */
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .text-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .text-title {
    font-size: 20px;
    font-weight: 800;
  }
</style>
