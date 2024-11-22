import axios from 'axios';
import type { Store } from '../model/store.type';

export const loadKakaoMap = (element: string, lat: number, lng: number, mapLevel: number) => {
  const container = document.getElementById(element);
  if (!container) {
    console.error('Map container not found!');
    return;
  }

  const options = {
    center: new window.kakao.maps.LatLng(lat, lng),
    level: mapLevel,
  };

  return new window.kakao.maps.Map(container, options);
};

export const searchPlaces = async (keyword: string): Promise<Store[]> => {
  return new Promise((resolve, reject) => {
    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(keyword, async (data, status) => {
      console.log(1);
      if (status === window.kakao.maps.services.Status.OK) {
        const storesPromises = data.map(async (store) => {
          const categoryParts = store.category_name.split(' > ');
          const category = categoryParts.slice(0, 2).join(' > ');

          let imageUrl = '';
          try {
            const response = await axios.get(`http://localhost:3000/api/search/image`, {
              params: {
                query: store.place_name,
              },
            });

            imageUrl = response.data.imageUrl || '/default-store-image.jpg';
            console.log(imageUrl);
          } catch (error) {
            console.error('이미지 검색 실패:', error);
            imageUrl = '/default-store-image.jpg';
          }
          console.log(imageUrl);
          return {
            id: store.id,
            name: store.place_name,
            address: store.address_name,
            roadAddress: store.road_address_name,
            category: category,
            phone: store.phone,
            url: store.place_url,
            img: imageUrl,
            x: store.x,
            y: store.y,
            reviewRate: 0,
            description: '',
          };
        });

        try {
          const stores = await Promise.all(storesPromises);
          resolve(stores);
        } catch (error) {
          console.error('데이터 처리 실패:', error);
          reject(error);
        }
      } else {
        reject(new Error('장소 검색 실패'));
      }
    });
  });
};
