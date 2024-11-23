export interface SupplyItem {
  name: string;
  src: string;
  category: SupplyCategory;
}

export type Supplies = {
  supply: SupplyItem[];
  category: SupplyCategory;
}

export type SupplyCategory = 
  | 'REQUIRED'
  | 'ELECTRONIC'
  | 'BEAUTY'
  | 'ETC'
  | 'CLOTHES'
  | 'EMERGENCY';
