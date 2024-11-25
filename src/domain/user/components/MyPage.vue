<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import AcceptLottie from '@/domain/common/components/AcceptLottie.vue';
  import { storeToRefs } from 'pinia';
  import { useTripStore } from '@/stores/tripStore';
  import { userService } from '@/domain/user/service/user.service';
  import type { InviteInfo } from '../types/inviteInfo.type';
  import { homeService } from '@/domain/home/service/home.service';

  const tripStore = useTripStore();
  const { tripSimpleList } = storeToRefs(tripStore);

  // 참여중인 여행 개수를 computed로 관리
  const participatingTrips = computed(() => tripSimpleList.value.length);

  // 사용자 정보 상태
  const userInfo = ref({
    name: '',
    email: '',
    profileImage: '',
    // joinDate: '2024-01-01', // 기본값 설정
  });

  // 수정용 임시 데이터
  const editingInfo = ref({
    name: userInfo.value.name,
    // currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // 초대받은 여행 리스트 데이터
  const invitedTrips = ref<InviteInfo[]>([
    {
      id: 1,
      tripId: 101,
      tripName: '제주도 여행',
      inviter: '김철수',
      inviteDate: '2024-03-15',
      status: 'pending',
    },
    {
      id: 2,
      tripId: 102,
      tripName: '부산 여행',
      inviter: '이영희',
      inviteDate: '2024-03-14',
      status: 'pending',
    },
  ]);

  const isEditing = ref(false);

  const acceptLottieRef = ref();
  const rejectLottieRef = ref();

  const handleEdit = () => {
    editingInfo.value = {
      name: userInfo.value.name,
      // currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
    isEditing.value = true;
  };

  const handleSave = () => {
    // 비밀번호 변경 시 유효성 검사
    if (
      editingInfo.value.newPassword &&
      editingInfo.value.newPassword !== editingInfo.value.confirmPassword
    ) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    userInfo.value.name = editingInfo.value.name;
    isEditing.value = false;
    // TODO: API 호출하여 서버에 저장
  };

  const handleCancel = () => {
    isEditing.value = false;
  };

  const handleAcceptInvite = async (inviteId: number) => {
    const acceptedTrip = invitedTrips.value.find((trip) => trip.id === inviteId);

    if (acceptedTrip) {
      // Lottie 애니메이션 표시
      acceptLottieRef.value?.showAnimation();
      // tripStore에 새로운 여행 추가 (tripId 사용)
      homeService.getTravelList();
      // 초대 리스트에서 제거
      invitedTrips.value = invitedTrips.value.filter((trip) => trip.id !== inviteId);
    }
  };

  const handleRejectInvite = (tripId: number) => {
    const rejectedTrip = invitedTrips.value.find((trip) => trip.id === tripId);

    if (rejectedTrip) {
      // Lottie 애니메이션 표시
      rejectLottieRef.value?.showAnimation();
      // 초대 리스트에서 제거
      invitedTrips.value = invitedTrips.value.filter((trip) => trip.id !== tripId);
    }
  };

  // onMounted 훅을 사용하여 유저 정보를 가져옴
  onMounted(async () => {
    try {
      const data = await userService.getUserInfo();
      if (data) {
        userInfo.value = {
          ...data,
          // joinDate: userInfo.value.joinDate, // 기존 joinDate 유지
        };
      }
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  });
</script>

<template>
  <div class="mypage-container">
    <!-- 1. 프로필 섹션 -->
    <div class="profile-section">
      <img :src="userInfo.profileImage" alt="profile" class="profile-image" />
      <div class="profile-info">
        <div class="info-row">
          <h2>{{ userInfo.name }}</h2>
          <button v-if="!isEditing" class="edit-button" @click="handleEdit">수정하기</button>
        </div>
        <p class="email">{{ userInfo.email }}</p>
      </div>
    </div>

    <!-- 2. 수정 폼 섹션 (조건부 표시) -->
    <div v-if="isEditing" class="edit-section">
      <div class="edit-form">
        <div class="input-group">
          <label>이름</label>
          <input
            v-model="editingInfo.name"
            type="text"
            class="edit-input"
            placeholder="이름을 입력하세요"
          />
        </div>
        <div class="password-section">
          <h3 class="password-title">비밀번호 변경</h3>
          <!-- <div class="input-group">
            <label>현재 비밀번호</label>
            <input
              v-model="editingInfo.currentPassword"
              type="password"
              class="edit-input"
              placeholder="현재 비밀번호"
            />
          </div> -->
          <div class="input-group">
            <label>새 비밀번호</label>
            <input
              v-model="editingInfo.newPassword"
              type="password"
              class="edit-input"
              placeholder="새 비밀번호"
            />
          </div>
          <div class="input-group">
            <label>새 비밀번호 확인</label>
            <input
              v-model="editingInfo.confirmPassword"
              type="password"
              class="edit-input"
              placeholder="새 비밀번호 확인"
            />
          </div>
        </div>
        <div class="form-buttons">
          <button class="save-button" @click="handleSave">저장하기</button>
          <button class="cancel-button" @click="handleCancel">취소</button>
        </div>
      </div>
    </div>

    <!-- 3. 통계 섹션 -->
    <div class="stats-section">
      <!-- <div class="stat-card">
        <h3>가입일</h3>
        <p>{{ userInfo.joinDate }}</p>
      </div> -->
      <div class="stat-card">
        <h3>참여중인 여행</h3>
        <p>{{ participatingTrips }}개</p>
      </div>
    </div>

    <!-- 4. 초대 섹션 -->
    <div class="invites-section">
      <h3 class="section-title">초대받은 여행</h3>
      <div class="invites-list" v-if="invitedTrips.length > 0">
        <div v-for="trip in invitedTrips" :key="trip.id" class="invite-card">
          <div class="invite-info">
            <h4>{{ trip.tripName }}</h4>
            <p class="invite-details">초대한 사람: {{ trip.inviter }} · {{ trip.inviteDate }}</p>
          </div>
          <div class="invite-actions">
            <button class="accept-button" @click="handleAcceptInvite(trip.id)">수락</button>
            <button class="reject-button" @click="handleRejectInvite(trip.id)">거절</button>
          </div>
        </div>
      </div>
      <p v-else class="no-invites">초대받은 여행이 없습니다.</p>
    </div>

    <!-- AcceptLottie 컴포넌트들 -->
    <AcceptLottie ref="acceptLottieRef" title="여행 초대를 수락했습니다!" />
    <AcceptLottie ref="rejectLottieRef" title="여행 초대를 거절했습니다." />
  </div>
</template>

<style scoped>
  .mypage-container {
    padding: 40px;
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .profile-section {
    display: flex;
    gap: 30px;
    align-items: center;
  }

  .profile-image {
    width: 120px;
    height: 120px;
    border-radius: 60px;
    object-fit: cover;
  }

  .profile-info {
    flex: 1;
  }

  .info-row {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;
  }

  .info-row h2 {
    margin: 0;
    font-size: 24px;
  }

  .email {
    color: #666;
    margin: 0;
  }

  .edit-button,
  .save-button,
  .cancel-button {
    padding: 8px 16px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    white-space: nowrap;
    min-width: 80px;
  }

  .edit-button,
  .save-button {
    background-color: #346aff;
    color: white;
  }

  .edit-button:hover,
  .save-button:hover {
    background-color: #2857d6;
  }

  .cancel-button {
    background-color: white;
    color: #666;
    border: 1px solid #ddd;
  }

  .cancel-button:hover {
    background-color: #f5f5f5;
  }

  .button-group {
    display: flex;
    gap: 12px;
    margin-left: auto;
  }

  .stats-section {
    display: flex;
    gap: 20px;
  }

  .stat-card {
    flex: 1;
    padding: 20px;
    background-color: #fff;
    border-radius: 12px;
    text-align: center;
  }

  .stat-card h3 {
    margin: 0 0 10px 0;
    color: #666;
    font-size: 16px;
  }

  .stat-card p {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
    color: #346aff;
  }

  .invites-section {
    border-radius: 12px;
  }

  .section-title {
    font-size: 20px;
    margin-bottom: 20px;
    color: #333;
  }

  .invites-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .invite-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: white;
    border-radius: 12px;
    border: 1px solid #eee;
    transition: all 0.2s ease;
  }

  .invite-card:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .invite-info h4 {
    margin: 0 0 8px 0;
    font-size: 16px;
    color: #333;
  }

  .invite-details {
    margin: 0;
    font-size: 14px;
    color: #666;
  }

  .invite-actions {
    display: flex;
    gap: 12px;
  }

  .accept-button,
  .reject-button {
    padding: 8px 16px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s ease;
  }

  .accept-button {
    background-color: #346aff;
    color: white;
  }

  .accept-button:hover {
    background-color: #2857d6;
  }

  .reject-button {
    background-color: white;
    color: #666;
    border: 1px solid #ddd;
  }

  .reject-button:hover {
    background-color: #f5f5f5;
  }

  .no-invites {
    text-align: center;
    color: #666;
    padding: 40px;
    background-color: #f8f9fa;
    border-radius: 12px;
  }

  .edit-section {
    background-color: #f8f9fa;
    border-radius: 12px;
    padding: 24px;
  }

  .edit-form {
    max-width: 400px;
  }

  .password-section {
    margin-top: 24px;
  }

  .password-title {
    font-size: 16px;
    margin: 0 0 16px 0;
    color: #333;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
  }

  .input-group label {
    font-size: 14px;
    color: #666;
  }

  .edit-input {
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid #ddd;
    font-size: 14px;
    width: 100%;
  }

  .edit-input:focus {
    outline: none;
    border-color: #346aff;
  }

  .form-buttons {
    display: flex;
    gap: 12px;
    margin-top: 24px;
  }

  .edit-button,
  .save-button,
  .cancel-button {
    padding: 8px 16px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    white-space: nowrap;
    min-width: 80px;
  }

  .edit-button,
  .save-button {
    background-color: #346aff;
    color: white;
  }

  .edit-button:hover,
  .save-button:hover {
    background-color: #2857d6;
  }

  .cancel-button {
    background-color: white;
    color: #666;
    border: 1px solid #ddd;
  }

  .cancel-button:hover {
    background-color: #f5f5f5;
  }
</style>
