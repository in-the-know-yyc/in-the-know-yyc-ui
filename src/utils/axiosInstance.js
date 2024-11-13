import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

AxiosInstance.interceptors.request.use(
  (config) => {
      const token = localStorage.getItem('authToken');

      // If token is present, add it to request's Authorization Header
      if (token) {
          if (config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
      }
      return config;
  },
  (error) => {
      console.error('ERROR ON AXIOS INTERCEPTOR:',error)
      // Handle request errors here
      return Promise.reject(error);
  }
);
  
export default AxiosInstance;