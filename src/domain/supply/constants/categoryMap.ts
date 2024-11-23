import type { SupplyCategory } from '../components/model/supply.type';

interface CategoryInfo {
  title: string;
  titleColor: string;
}

export const CATEGORY_MAP: Record<SupplyCategory, CategoryInfo> = {
  REQUIRED: {
    title: '필수 준비물',
    titleColor: '#fe742c'
  },
  ELECTRONIC: {
    title: '전자기기',
    titleColor: '#3abf92'
  },
  BEAUTY: {
    title: '샤워, 화장, 미용',
    titleColor: '#346aff'
  },
  ETC: {
    title: '기타',
    titleColor: '#f63e6a'
  },
  CLOTHES: {
    title: '옷',
    titleColor: '#6ecb63'
  },
  EMERGENCY: {
    title: '비상용품',
    titleColor: '#ff8b60'
  }
} as const; 