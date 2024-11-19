import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// TODO: axios 인터셉터 추가!!

export default axiosInstance;
