<script setup lang="ts">
  import SupplyComponent from './SupplyComponent.vue';

  const requiredSupplies = [
    { name: '여권', src: '/src/assets/icons/supplies/requiredSupplies/passport.png' },
    { name: '비자', src: '/src/assets/icons/supplies/requiredSupplies/visa.png' },
    { name: '여권용 증명사진', src: '/src/assets/icons/supplies/requiredSupplies/photo.png' },
    { name: '항공티켓', src: '/src/assets/icons/supplies/requiredSupplies/ticket-flight.png' },
    { name: '공항리무진티켓', src: '/src/assets/icons/supplies/requiredSupplies/limousine.png' },
    { name: '호텔바우처', src: '/src/assets/icons/supplies/requiredSupplies/voucher.png' },
    { name: '결제용카드', src: '/src/assets/icons/supplies/requiredSupplies/credit-card.png' },
    {
      name: '국내운전면허증',
      src: '/src/assets/icons/supplies/requiredSupplies/driving-license.png',
    },
    {
      name: '국제운전면허증',
      src: '/src/assets/icons/supplies/requiredSupplies/driving-license.png',
    },
    {
      name: '여행자보험증',
      src: '/src/assets/icons/supplies/requiredSupplies/health-insurance.png',
    },
    { name: '유심', src: '/src/assets/icons/supplies/requiredSupplies/sim.png' },
  ];

  const electronicSupplies = [
    { name: '노트북', src: '/src/assets/icons/supplies/electronicSupplies/laptop.png' },
    { name: '카메라', src: '/src/assets/icons/supplies/electronicSupplies/camera.png' },
    { name: '카메라 충전기', src: '/src/assets/icons/supplies/electronicSupplies/charger.png' },
    { name: '노트북 충전기', src: '/src/assets/icons/supplies/electronicSupplies/charger.png' },
    { name: '핸드폰 충전기', src: '/src/assets/icons/supplies/electronicSupplies/charger.png' },
    { name: '태블릿', src: '/src/assets/icons/supplies/electronicSupplies/tablet.png' },
    { name: '태블릿 충전기', src: '/src/assets/icons/supplies/electronicSupplies/charger.png' },
    { name: '워치', src: '/src/assets/icons/supplies/electronicSupplies/smart-watch.png' },
    { name: '워치 충전기', src: '/src/assets/icons/supplies/electronicSupplies/charger.png' },
    { name: '멀티어댑터', src: '/src/assets/icons/supplies/electronicSupplies/power-strip.png' },
    { name: '이어폰', src: '/src/assets/icons/supplies/electronicSupplies/earphones.png' },
    { name: '스피커', src: '/src/assets/icons/supplies/electronicSupplies/speaker.png' },
    { name: '드라이기', src: '/src/assets/icons/supplies/electronicSupplies/hair-dryer.png' },
    { name: 'SD카드', src: '/src/assets/icons/supplies/electronicSupplies/sd-card.png' },
    { name: '셀카봉', src: '/src/assets/icons/supplies/electronicSupplies/selfie-stick.png' },
  ];

  const beautySupplies = [
    { name: '스킨 로션', src: '/src/assets/icons/supplies/beautySupplies/lotion.png' },
    { name: '자외선 차단제 ', src: '/src/assets/icons/supplies/beautySupplies/sun-cream.png' },
    { name: '화장품', src: '/src/assets/icons/supplies/beautySupplies/cosmetics.png' },
    { name: '헤어 에센스', src: '/src/assets/icons/supplies/beautySupplies/hair-conditioner.png' },
    { name: '롤', src: '/src/assets/icons/supplies/beautySupplies/hair-roll.png' },
    { name: '향수', src: '/src/assets/icons/supplies/beautySupplies/perfume.png' },
    { name: '화장솜 면봉', src: '/src/assets/icons/supplies/beautySupplies/cotton-buds.png' },
    { name: '렌즈 안경', src: '/src/assets/icons/supplies/beautySupplies/glasses.png' },
    { name: '샴푸 린스', src: '/src/assets/icons/supplies/beautySupplies/shampoo.png' },
    { name: '바디 워시', src: '/src/assets/icons/supplies/beautySupplies/body-wash.png' },
    { name: '칫솔 치약', src: '/src/assets/icons/supplies/beautySupplies/toothbrush.png' },
    { name: '클렌징', src: '/src/assets/icons/supplies/beautySupplies/cleansing.png' },
    { name: '면도기', src: '/src/assets/icons/supplies/beautySupplies/shaver.png' },
  ];

  const etcSupplies = [
    { name: '수영복', src: '/src/assets/icons/supplies/etcSupplies/swimsuit.png' },
    { name: '물안경', src: '/src/assets/icons/supplies/etcSupplies/swimming-glasses.png' },
    { name: '튜브', src: '/src/assets/icons/supplies/etcSupplies/tube.png' },
    { name: '지퍼백 ', src: '/src/assets/icons/supplies/etcSupplies/zip-bag.png' },
    { name: '우산', src: '/src/assets/icons/supplies/etcSupplies/umbrella.png' },
    { name: '간식', src: '/src/assets/icons/supplies/etcSupplies/snacks.png' },
    { name: '컵라면', src: '/src/assets/icons/supplies/etcSupplies/noodles.png' },
    { name: '손톱깍이', src: '/src/assets/icons/supplies/etcSupplies/nail-clipper.png' },
    { name: '물티슈', src: '/src/assets/icons/supplies/etcSupplies/wet-wipes.png' },
  ];

  const clothesSupplies = [
    { name: '옷', src: '/src/assets/icons/supplies/clothesSupplies/clothes.png' },
    { name: '속옷', src: '/src/assets/icons/supplies/clothesSupplies/underwear.png' },
    { name: '잠옷', src: '/src/assets/icons/supplies/clothesSupplies/pajamas.png' },
    { name: '양말 ', src: '/src/assets/icons/supplies/clothesSupplies/socks.png' },
    { name: '선글라스', src: '/src/assets/icons/supplies/clothesSupplies/sun-glasses.png' },
    { name: '가방', src: '/src/assets/icons/supplies/clothesSupplies/bag.png' },
    { name: '모자', src: '/src/assets/icons/supplies/clothesSupplies/cap.png' },
    { name: '슬리퍼', src: '/src/assets/icons/supplies/clothesSupplies/slippers.png' },
  ];

  const emergencySupplies = [
    { name: '비타민', src: '/src/assets/icons/supplies/emergencySupplies/vitamins.png' },
    { name: '소화제', src: '/src/assets/icons/supplies/emergencySupplies/medicine.png' },
    { name: '지사제', src: '/src/assets/icons/supplies/emergencySupplies/medicine.png' },
    { name: '소염제 ', src: '/src/assets/icons/supplies/emergencySupplies/medicine.png' },
    { name: '종합 감기약', src: '/src/assets/icons/supplies/emergencySupplies/medicine.png' },
    { name: '진통제', src: '/src/assets/icons/supplies/emergencySupplies/medicine.png' },
    { name: '멀미약', src: '/src/assets/icons/supplies/emergencySupplies/medicine.png' },
    { name: '밴드', src: '/src/assets/icons/supplies/emergencySupplies/band.png' },
    { name: '연고', src: '/src/assets/icons/supplies/emergencySupplies/ointment.png' },
    { name: '모기약', src: '/src/assets/icons/supplies/emergencySupplies/mosquito-repellent.png' },
    { name: '생리대', src: '/src/assets/icons/supplies/emergencySupplies/sanitary-pad.png' },
    { name: '마스크', src: '/src/assets/icons/supplies/emergencySupplies/mask.png' },
  ];
</script>

<template>
  <div class="supplies-dash-outside-layout">
    <SupplyComponent :supplies="requiredSupplies" background-color="#FBEDEA">
      <template #header>
        <div class="supply-component-header-title" style="color: #fe742c">필수 준비물</div>
      </template>
    </SupplyComponent>

    <SupplyComponent :supplies="electronicSupplies" background-color="#E0EEEF">
      <template #header>
        <div class="supply-component-header-title" style="color: #3abf92">전자기기</div>
      </template>
    </SupplyComponent>

    <SupplyComponent :supplies="beautySupplies" background-color="#D8E1FE">
      <template #header>
        <div class="supply-component-header-title" style="color: #346aff">샤워, 화장, 미용</div>
      </template>
    </SupplyComponent>

    <SupplyComponent :supplies="etcSupplies" background-color="#FFD6E8">
      <template #header>
        <div class="supply-component-header-title" style="color: #f63e6a">기타</div>
      </template>
    </SupplyComponent>

    <SupplyComponent :supplies="clothesSupplies" background-color="#DFF6DD">
      <template #header>
        <div class="supply-component-header-title" style="color: #6ecb63">옷</div>
      </template>
    </SupplyComponent>

    <SupplyComponent :supplies="emergencySupplies" background-color="#FFF7E5">
      <template #header>
        <div class="supply-component-header-title" style="color: #ff8b60">비상용품</div>
      </template>
    </SupplyComponent>
  </div>
</template>

<style scoped>
  .supplies-dash-outside-layout {
    background-color: white;
    height: 100%;
    width: 100%;
    border-radius: 20px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: end;
    overflow-y: auto;
  }
  .supply-component-header-title {
    font-size: 20px;
    font-weight: 700;
  }
</style>
