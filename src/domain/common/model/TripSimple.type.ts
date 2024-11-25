export type TripSimple = {
  id: number;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type TripSimpleList = TripSimple[];
