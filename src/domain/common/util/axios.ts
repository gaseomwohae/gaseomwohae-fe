import axios, { type AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://f3da-175-209-87-219.ngrok-free.app',
  headers: {
    'Content-Type': `application/json`,
    'ngrok-skip-browser-warning': true,
  },
  withCredentials: true,
});

// 요청 확인용 인터셉터
axiosInstance.interceptors.request.use((config) => {
  console.log('request');
  console.log(config);
  return config;
});

// TODO: axios 인터셉터 추가!!

// 응답 확인용 인터셉터
axiosInstance.interceptors.response.use((response) => {
  console.log(response);
  return response;
});

export default axiosInstance;
