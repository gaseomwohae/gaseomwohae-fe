import axiosInstance from '@/domain/common/util/axios';
import type { ApiResponse } from '@/domain/common/model/response.type';

export type Invitation = {
  id: number;
  inviterUserId: number;
  invitedUserId: number;
  travelId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

class ParticipationService {
  async inviteParticipant(travelId: number, email: string): Promise<ApiResponse<null>> {
    try {
      const response = await axiosInstance.post<ApiResponse<null>>('/api/travel/invite', {
        travelId,
        email,
      });
      return response.data;
    } catch (error) {
      console.error('Error occurred while inviting participant:', error);
      throw error;
    }
  }

  async getInvitations(): Promise<Invitation[] | null> {
    try {
      const response = await axiosInstance.get<ApiResponse<Invitation[]>>('/api/travel/invite');
      const apiResponse = response.data;

      if (apiResponse.code === 200 && apiResponse.success) {
        console.log('Invitations fetched successfully:', apiResponse.data);
        return apiResponse.data;
      } else {
        console.error('Failed to fetch invitations:', apiResponse.message);
        return [];
      }
    } catch (error) {
      console.error('Error occurred while fetching invitations:', error);
      return [];
    }
  }

  async rejectInvitation(inviteId: number): Promise<ApiResponse<null>> {
    try {
      const response = await axiosInstance.post<ApiResponse<null>>(`/api/travel/invite/reject/${inviteId}`);
      return response.data;
    } catch (error) {
      console.error('Error occurred while rejecting invitation:', error);
      throw error;
    }
  }
}

export const participationService = new ParticipationService();
