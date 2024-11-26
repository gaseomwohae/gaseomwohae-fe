import type { TripSimple } from '@/domain/common/model/TripSimple.type';
import type { Participant } from '@/domain/common/model/Participant.type';
import type { Supplies } from '@/domain/supply/components/model/supply.type';
import type { LocalVisitor } from './localVisitor.type';
import type { Place } from '@/domain/travel/model/travel.type';
import type { DailySchedule } from '@/domain/travel/model/travel.type';
import type { WeatherInfo } from '@/domain/travel/model/travel.type';

export type TripInfo = {
  trip: TripSimple;
  schedules: DailySchedule[];
  participants: Participant[];
  supplies: Supplies;
  accomodations: Place[];
  localVisitors: LocalVisitor[];
  weatherInfos: WeatherInfo[];
  position: Position | null;
};


export type Position = {
  x: number;
  y: number;
};



