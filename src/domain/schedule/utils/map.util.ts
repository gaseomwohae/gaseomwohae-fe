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

export const searchPlaces = async (keyword: string): Store[] => {
  return new Promise((resolve, reject) => {
    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const stores: Store[] = data.map((store) => {
          const categoryParts = store.category_name.split(' > ');
          const category = categoryParts.slice(0, 2).join(' > ');

          return {
            id: store.id,
            name: store.place_name,
            address: store.address_name,
            roadAddress: store.road_address_name,
            category: category,
            phone: store.phone,
            url: store.place_url,
            x: store.x,
            y: store.y,
          };
        });
        resolve(stores);
      }
    });
  });
};
