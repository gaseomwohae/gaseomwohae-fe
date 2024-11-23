import type { Destination } from './destination.type';

export type LocalVisitor = {
  name: string;
  visitorCount: number;
  destination: Destination;
};
