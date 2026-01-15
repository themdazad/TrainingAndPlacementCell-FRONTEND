/**
 * API Configuration
 * Explanation:
 * This module sets up and exports a configured Axios instance for making HTTP requests
 * to the backend API. It includes base URL configuration, request and response interceptors,
 * and common headers.
 */

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create axios instance
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true, // Send cookies with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth token from localStorage here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
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
    const { response } = error;

    // Handle common errors
    if (response) {
      switch (response.status) {
        case 401:
          // Unauthorized - redirect to login or refresh token
          // window.location.href = '/login';
          break;
        case 403:
          // Forbidden - Access denied
          break;
        case 429:
          // Rate limited - Too many requests
          break;
        case 500:
          // Server error
          break;
        default:
          break;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
