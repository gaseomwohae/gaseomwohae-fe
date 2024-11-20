import axios, { type AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 요청 확인용 인터셉터
axiosInstance.interceptors.request.use((config) => {
  console.log(config);
  return config;
});

// TODO: axios 인터셉터 추가!!

export default axiosInstance;
