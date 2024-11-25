import type { TripSimple } from '@/domain/common/model/TripSimple.type';
import type { Participant } from '@/domain/common/model/Participant.type';
import type { Supplies } from '@/domain/supply/components/model/supply.type';
import type { LocalVisitor } from './localVisitor.type';
import type { Place } from '@/domain/travel/model/travel.type';
import type { Schedule } from '@/domain/travel/model/travel.type';


export type TripInfo = {
  trip: TripSimple;
  schedules: Schedule[];
  participants: Participant[];
  supplies: Supplies;
  accomodations: Place[];
  localVisitors: LocalVisitor[];
};




