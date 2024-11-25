import type { Place } from '@/domain/travel/model/travel.type';

export type LocalVisitor = {
  name: string;
  visitorCount: number;
  destination: Place;
};
