import { defineStore } from 'pinia';
import type { Invitation } from '@/domain/participation/service/participation.service';

export const useInvitationStore = defineStore('invitation', {
  state: () => ({
    invitations: [] as Invitation[],
  }),

  actions: {
    setInvitations(invitations: Invitation[]) {
      this.invitations = invitations;
    },

    addInvitation(invitation: Invitation) {
      this.invitations.push(invitation);
    },

    removeInvitation(inviteId: number) {
      this.invitations = this.invitations.filter(invitation => invitation.inviteId !== inviteId);
    },
  },
});
