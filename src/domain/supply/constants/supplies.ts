import type { SupplyItem } from '../components/model/supply.type';

export const SUPPLIES: Record<string, SupplyItem[]> = {
  REQUIRED: [
    { name: '여권', src: '/src/assets/icons/supplies/requiredSupplies/passport.png', category: 'REQUIRED' },
    { name: '비자', src: '/src/assets/icons/supplies/requiredSupplies/visa.png', category: 'REQUIRED' },
    { name: '여권용 증명사진', src: '/src/assets/icons/supplies/requiredSupplies/photo.png', category: 'REQUIRED' },
    { name: '항공티켓', src: '/src/assets/icons/supplies/requiredSupplies/ticket-flight.png', category: 'REQUIRED' },
    { name: '공항리무진티켓', src: '/src/assets/icons/supplies/requiredSupplies/limousine.png', category: 'REQUIRED' },
    { name: '호텔바우처', src: '/src/assets/icons/supplies/requiredSupplies/voucher.png', category: 'REQUIRED' },
    { name: '결제용카드', src: '/src/assets/icons/supplies/requiredSupplies/credit-card.png', category: 'REQUIRED' },
    { name: '국내운전면허증', src: '/src/assets/icons/supplies/requiredSupplies/driving-license.png', category: 'REQUIRED' },
    { name: '국제운전면허증', src: '/src/assets/icons/supplies/requiredSupplies/driving-license.png', category: 'REQUIRED' },
    { name: '여행자보험증', src: '/src/assets/icons/supplies/requiredSupplies/health-insurance.png', category: 'REQUIRED' },
    { name: '유심', src: '/src/assets/icons/supplies/requiredSupplies/sim.png', category: 'REQUIRED' }
  ],
  ELECTRONIC: [
    { name: '노트북', src: '/src/assets/icons/supplies/electronicSupplies/laptop.png', category: 'ELECTRONIC' },
    { name: '카메라', src: '/src/assets/icons/supplies/electronicSupplies/camera.png', category: 'ELECTRONIC' },
    { name: '카메라 충전기', src: '/src/assets/icons/supplies/electronicSupplies/charger.png', category: 'ELECTRONIC' },
    { name: '노트북 충전기', src: '/src/assets/icons/supplies/electronicSupplies/charger.png', category: 'ELECTRONIC' },
    { name: '핸드폰 충전기', src: '/src/assets/icons/supplies/electronicSupplies/charger.png', category: 'ELECTRONIC' },
    { name: '태블릿', src: '/src/assets/icons/supplies/electronicSupplies/tablet.png', category: 'ELECTRONIC' },
    { name: '태블릿 충전기', src: '/src/assets/icons/supplies/electronicSupplies/charger.png', category: 'ELECTRONIC' },
    { name: '워치', src: '/src/assets/icons/supplies/electronicSupplies/smart-watch.png', category: 'ELECTRONIC' },
    { name: '워치 충전기', src: '/src/assets/icons/supplies/electronicSupplies/charger.png', category: 'ELECTRONIC' },
    { name: '멀티어댑터', src: '/src/assets/icons/supplies/electronicSupplies/power-strip.png', category: 'ELECTRONIC' },
    { name: '이어폰', src: '/src/assets/icons/supplies/electronicSupplies/earphones.png', category: 'ELECTRONIC' },
    { name: '스피커', src: '/src/assets/icons/supplies/electronicSupplies/speaker.png', category: 'ELECTRONIC' },
    { name: '드라이기', src: '/src/assets/icons/supplies/electronicSupplies/hair-dryer.png', category: 'ELECTRONIC' },
    { name: 'SD카드', src: '/src/assets/icons/supplies/electronicSupplies/sd-card.png', category: 'ELECTRONIC' },
    { name: '셀카봉', src: '/src/assets/icons/supplies/electronicSupplies/selfie-stick.png', category: 'ELECTRONIC' }
  ],
  BEAUTY: [
    { name: '스킨 로션', src: '/src/assets/icons/supplies/beautySupplies/lotion.png', category: 'BEAUTY' },
    { name: '자외선 차단제', src: '/src/assets/icons/supplies/beautySupplies/sun-cream.png', category: 'BEAUTY' },
    { name: '화장품', src: '/src/assets/icons/supplies/beautySupplies/cosmetics.png', category: 'BEAUTY' },
    { name: '헤어 에센스', src: '/src/assets/icons/supplies/beautySupplies/hair-conditioner.png', category: 'BEAUTY' },
    { name: '롤', src: '/src/assets/icons/supplies/beautySupplies/hair-roll.png', category: 'BEAUTY' },
    { name: '향수', src: '/src/assets/icons/supplies/beautySupplies/perfume.png', category: 'BEAUTY' },
    { name: '화장솜 면봉', src: '/src/assets/icons/supplies/beautySupplies/cotton-buds.png', category: 'BEAUTY' },
    { name: '렌즈 안경', src: '/src/assets/icons/supplies/beautySupplies/glasses.png', category: 'BEAUTY' },
    { name: '샴푸 린스', src: '/src/assets/icons/supplies/beautySupplies/shampoo.png', category: 'BEAUTY' },
    { name: '바디 워시', src: '/src/assets/icons/supplies/beautySupplies/body-wash.png', category: 'BEAUTY' },
    { name: '칫솔 치약', src: '/src/assets/icons/supplies/beautySupplies/toothbrush.png', category: 'BEAUTY' },
    { name: '클렌징', src: '/src/assets/icons/supplies/beautySupplies/cleansing.png', category: 'BEAUTY' },
    { name: '면도기', src: '/src/assets/icons/supplies/beautySupplies/shaver.png', category: 'BEAUTY' }
  ],
  ETC: [
    { name: '수영복', src: '/src/assets/icons/supplies/etcSupplies/swimsuit.png', category: 'ETC' },
    { name: '물안경', src: '/src/assets/icons/supplies/etcSupplies/swimming-glasses.png', category: 'ETC' },
    { name: '튜브', src: '/src/assets/icons/supplies/etcSupplies/tube.png', category: 'ETC' },
    { name: '지퍼백', src: '/src/assets/icons/supplies/etcSupplies/zip-bag.png', category: 'ETC' },
    { name: '우산', src: '/src/assets/icons/supplies/etcSupplies/umbrella.png', category: 'ETC' },
    { name: '간식', src: '/src/assets/icons/supplies/etcSupplies/snacks.png', category: 'ETC' },
    { name: '컵라면', src: '/src/assets/icons/supplies/etcSupplies/noodles.png', category: 'ETC' },
    { name: '손톱깍이', src: '/src/assets/icons/supplies/etcSupplies/nail-clipper.png', category: 'ETC' },
    { name: '물티슈', src: '/src/assets/icons/supplies/etcSupplies/wet-wipes.png', category: 'ETC' }
  ],
  CLOTHES: [
    { name: '옷', src: '/src/assets/icons/supplies/clothesSupplies/clothes.png', category: 'CLOTHES' },
    { name: '속옷', src: '/src/assets/icons/supplies/clothesSupplies/underwear.png', category: 'CLOTHES' },
    { name: '잠옷', src: '/src/assets/icons/supplies/clothesSupplies/pajamas.png', category: 'CLOTHES' },
    { name: '양말', src: '/src/assets/icons/supplies/clothesSupplies/socks.png', category: 'CLOTHES' },
    { name: '선글라스', src: '/src/assets/icons/supplies/clothesSupplies/sun-glasses.png', category: 'CLOTHES' },
    { name: '가방', src: '/src/assets/icons/supplies/clothesSupplies/bag.png', category: 'CLOTHES' },
    { name: '모자', src: '/src/assets/icons/supplies/clothesSupplies/cap.png', category: 'CLOTHES' },
    { name: '슬리퍼', src: '/src/assets/icons/supplies/clothesSupplies/slippers.png', category: 'CLOTHES' }
  ],
  EMERGENCY: [
    { name: '비타민', src: '/src/assets/icons/supplies/emergencySupplies/vitamins.png', category: 'EMERGENCY' },
    { name: '소화제', src: '/src/assets/icons/supplies/emergencySupplies/medicine.png', category: 'EMERGENCY' },
    { name: '지사제', src: '/src/assets/icons/supplies/emergencySupplies/medicine.png', category: 'EMERGENCY' },
    { name: '소염제', src: '/src/assets/icons/supplies/emergencySupplies/medicine.png', category: 'EMERGENCY' },
    { name: '종합 감기약', src: '/src/assets/icons/supplies/emergencySupplies/medicine.png', category: 'EMERGENCY' },
    { name: '진통제', src: '/src/assets/icons/supplies/emergencySupplies/medicine.png', category: 'EMERGENCY' },
    { name: '멀미약', src: '/src/assets/icons/supplies/emergencySupplies/medicine.png', category: 'EMERGENCY' },
    { name: '밴드', src: '/src/assets/icons/supplies/emergencySupplies/band.png', category: 'EMERGENCY' },
    { name: '연고', src: '/src/assets/icons/supplies/emergencySupplies/ointment.png', category: 'EMERGENCY' },
    { name: '모기약', src: '/src/assets/icons/supplies/emergencySupplies/mosquito-repellent.png', category: 'EMERGENCY' },
    { name: '생리대', src: '/src/assets/icons/supplies/emergencySupplies/sanitary-pad.png', category: 'EMERGENCY' },
    { name: '마스크', src: '/src/assets/icons/supplies/emergencySupplies/mask.png', category: 'EMERGENCY' }
  ]
}; 