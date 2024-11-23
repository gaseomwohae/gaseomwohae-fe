import axios from 'axios';

class StoreService {
  // async getScheduleList(travelId: number, date: string): Promise<Schedule[]> {
  //   return await axiosInstance.get('/api/schedule');
  // }

  // async getPlaceDetail(placeId: number): Promise<PlaceWithReview> {
  //   return await axiosInstance.get('/api/review');
  // }

  async getPlaceImage(placeName: string): Promise<string> {
    const response = await axios.get('http://localhost:3000/api/search/image', {
      params: { query: placeName },
    });
    return response.data.imageUrl;
  }
}

export default new StoreService();
