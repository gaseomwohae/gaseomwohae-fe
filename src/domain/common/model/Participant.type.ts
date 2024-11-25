export type ParticipantApiResponse = {
  id: number;
  name: string;
  userId: number;
  travelId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type Participant = {
  id: number;
  name: string;
  userId: number;
  travelId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isActive: boolean;
};

export type ParticipantList = Participant[];

export function mapApiResponseToParticipant(apiResponse: ParticipantApiResponse): Participant {
  return {
    ...apiResponse,
    isActive: false,
  };
}
