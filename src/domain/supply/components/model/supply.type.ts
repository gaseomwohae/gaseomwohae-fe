export interface SupplyItem {
  id: number;
  name: string;
  image: string;
  category: SupplyCategory;
}

export type Supplies = Record<SupplyCategory, SupplyItem[]>;

export type SupplyCategory = 
  | 'REQUIRED'
  | 'ELECTRONIC'
  | 'BEAUTY'
  | 'ETC'
  | 'CLOTHES'
  | 'EMERGENCY';
