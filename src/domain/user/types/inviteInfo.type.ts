export interface InviteInfo {
  id: number;          // 초대장 ID
  tripId: number;      // 여행 ID
  tripName: string;    // 여행 이름
  inviter: string;     // 초대한 사람
  inviteDate: string;  // 초대 날짜
  status: 'pending' | 'accepted' | 'rejected';  // 초대 상태
} 