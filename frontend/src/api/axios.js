import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: `http://${import.meta.env.VITE_GATEWAY}/api/`, 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor - add auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor 
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
      
      // Handle specific status codes
      if (error.response.status === 401) {
        console.error('Unauthorized - please login');
      }
    } else if (error.request) {
      console.error('No response from server');
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;