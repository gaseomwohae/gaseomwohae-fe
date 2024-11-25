import axiosInstance from '@/domain/common/util/axios';
import type { ApiResponse } from '@/domain/common/model/response.type';
import { useInvitationStore } from '@/stores/invitationStore';
import type { TripSimple } from '@/domain/common/model/TripSimple.type';
import type { ParticipantApiResponse } from '@/domain/common/model/Participant.type';
import { formatDateTime } from '@/domain/travel/utils/time.util';

export type Invitation = {
  inviteId: number;
  travel: TripSimple;
  inviterUser: ParticipantApiResponse;
  invitedUser: ParticipantApiResponse;
  createdAt: string;
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

  async getInvitations(): Promise<void> {
    const invitationStore = useInvitationStore();
    try {
      const response = await axiosInstance.get<ApiResponse<Invitation[]>>('/api/travel/invite');
      const apiResponse = response.data;

      if (apiResponse.code === 200 && apiResponse.success) {
        console.log('Invitations fetched successfully:', apiResponse.data);

        const formattedInvitations = apiResponse.data?.map(invitation => ({
          ...invitation,
          createdAt: formatDateTime(invitation.createdAt),
        }));

        invitationStore.setInvitations(formattedInvitations || []);
      } else {
        console.error('Failed to fetch invitations:', apiResponse.message);
        invitationStore.setInvitations([]);
      }
    } catch (error) {
      console.error('Error occurred while fetching invitations:', error);
      invitationStore.setInvitations([]);
    }
  }

  async rejectInvitation(inviteId: number): Promise<ApiResponse<null>> {
    const invitationStore = useInvitationStore();
    try {
      const response = await axiosInstance.post<ApiResponse<null>>(`/api/travel/invite/reject/${inviteId}`);
      if (response.data.success) {
        invitationStore.removeInvitation(inviteId);
      }
      return response.data;
    } catch (error) {
      console.error('Error occurred while rejecting invitation:', error);
      throw error;
    }
  }

  async acceptInvitation(inviteId: number): Promise<ApiResponse<null>> {
    const invitationStore = useInvitationStore();
    try {
      const response = await axiosInstance.post<ApiResponse<null>>(`/api/travel/invite/accept/${inviteId}`);
      if (response.data.success) {
        invitationStore.removeInvitation(inviteId);
      }
      return response.data;
    } catch (error) {
      console.error('Error occurred while accepting invitation:', error);
      throw error;
    }
  }
}

export const participationService = new ParticipationService();
