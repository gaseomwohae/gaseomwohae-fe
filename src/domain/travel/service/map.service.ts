import type { Place } from '@/domain/travel/model/travel.type';

import PlaceService from '@/domain/travel/service/place.service';

class MapService {
  initMap = (container: string, lat: number, lng: number, mapLevel: number): kakao.maps.Map => {
    const mapContainer = document.getElementById(container);

    const mapOptions = {
      center: new window.kakao.maps.LatLng(lat, lng),
      level: mapLevel,
    };

    return new window.kakao.maps.Map(mapContainer, mapOptions);
  };

  async searchPlaces(map: kakao.maps.Map, keyword: string): Promise<Place[]> {
    if (!map) {
      throw new Error('Map is not initialized');
    }

    const searchResult = await new Promise<kakao.maps.services.PlacesSearchResult>(
      (resolve, reject) => {
        const placeService = new window.kakao.maps.services.Places();
        placeService.keywordSearch(keyword, (data, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const bounds = new window.kakao.maps.LatLngBounds();
            data.forEach((place) => {
              this.displayMarker(map, place);
              bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
            });
            map.setBounds(bounds);
            resolve(data);
          } else {
            reject(new Error('장소 검색 실패'));
          }
        });
      },
    );

    return Promise.all(
      searchResult.map(async (place) => ({
        id: Number(place.id),
        name: place.place_name,
        address: place.address_name,
        roadAddress: place.road_address_name,
        category: place.category_name.split(' > ').slice(0, 2).join(' > '),
        phone: place.phone,
        url: place.place_url,
        imgUrl: await PlaceService.getPlaceImage(place.place_name),
        x: place.x,
        y: place.y,
        reviewRate: 0,
      })),
    );

  }

  displayMarker(map: kakao.maps.Map, place: kakao.maps.services.PlacesSearchResultItem) {
    const marker = new window.kakao.maps.Marker({
      map: map,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });
  }
}

export const mapService = new MapService();
