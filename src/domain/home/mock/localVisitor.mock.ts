import type { LocalVisitor } from '../model/localVisitor.type';

export const mockBusanVisitors: LocalVisitor[] = [
  {
    name: '해운대',
    visitorCount: 1500,
    destination: {
      id: 1,
      name: '해운대해수욕장',
      category: '관광명소',
      address: '부산 해운대구 우동',
      roadAddress: '부산 해운대구 해운대해변로 264',
      thumbnail: 'https://example.com/haeundae.jpg',
      phone: '051-749-7601',
      url: 'https://www.haeundae.go.kr',
      x: 129.1589,
      y: 35.1588,
      createdAt: '2023-12-20T00:00:00Z',
      updatedAt: '2023-12-20T00:00:00Z',
      deletedAt: null,
      rating: 4.7
    }
  },
  {
    name: '광안리',
    visitorCount: 1200,
    destination: {
      id: 2,
      name: '광안리해수욕장',
      category: '관광명소',
      address: '부산 수영구 광안동',
      roadAddress: '부산 수영구 광안해변로 219',
      thumbnail: 'https://example.com/gwangalli.jpg',
      phone: '051-622-4251',
      url: 'https://www.suyeong.go.kr',
      x: 129.1189,
      y: 35.1531,
      createdAt: '2023-12-20T00:00:00Z',
      updatedAt: '2023-12-20T00:00:00Z',
      deletedAt: null,
      rating: 4.6
    }
  },
  {
    name: '서면',
    visitorCount: 1000,
    destination: {
      id: 3,
      name: '서면지하상가',
      category: '쇼핑',
      address: '부산 부산진구 부전동',
      roadAddress: '부산 부산진구 중앙대로 지하 786',
      thumbnail: 'https://example.com/seomyeon.jpg',
      phone: '051-819-7891',
      url: 'https://www.bisco.or.kr',
      x: 129.0595,
      y: 35.1581,
      createdAt: '2023-12-20T00:00:00Z',
      updatedAt: '2023-12-20T00:00:00Z',
      deletedAt: null,
      rating: 4.3
    }
  },
  {
    name: '남포동',
    visitorCount: 800,
    destination: {
      id: 4,
      name: 'BIFF광장',
      category: '관광명소',
      address: '부산 중구 남포동',
      roadAddress: '부산 중구 구덕로 31',
      thumbnail: 'https://example.com/nampodong.jpg',
      phone: '051-243-8797',
      url: 'https://www.bsjunggu.go.kr',
      x: 129.0276,
      y: 35.0981,
      createdAt: '2023-12-20T00:00:00Z',
      updatedAt: '2023-12-20T00:00:00Z',
      deletedAt: null,
      rating: 4.4
    }
  },
  {
    name: '송정',
    visitorCount: 600,
    destination: {
      id: 5,
      name: '송정해수욕장',
      category: '관광명소',
      address: '부산 해운대구 송정동',
      roadAddress: '부산 해운대구 송정해변로 62',
      thumbnail: 'https://example.com/songjeong.jpg',
      phone: '051-749-7601',
      url: 'https://www.haeundae.go.kr',
      x: 129.2023,
      y: 35.1785,
      createdAt: '2023-12-20T00:00:00Z',
      updatedAt: '2023-12-20T00:00:00Z',
      deletedAt: null,
      rating: 4.5
    }
  }
]; 