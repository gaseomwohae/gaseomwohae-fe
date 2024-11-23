import type { TripSimple } from '@/domain/common/model/TripSimple.type';
import type { Participant } from '@/domain/common/model/Participant.type';
import type { Supplies } from '@/domain/supply/components/model/supply.type';
import type { Destination } from './destination.type';
import type { LocalVisitor } from './localVisitor.type';

export type TripInfo = {
  trip: TripSimple;
  tripStartDate: string;
  tripEndDate: string;
  participants: Participant[];
  tripRoute: TripRoute;
  supplies: Supplies[];
  accomodations: Destination[];
  localVisitors: LocalVisitor[];
  budget: number;   
};



type TripRoute = {
  startDestination: Destination;
  endDestination: Destination;
  travelTime: string;
};
