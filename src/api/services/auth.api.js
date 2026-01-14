/**
 * Auth API Service
 * Explanation:
 * This module provides functions to interact with authentication-related API endpoints.
 * It includes methods for user registration, login, logout, password management, and profile updates.
 */

import api from '../axiosInstance';

const authApi = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Admin login
  adminLogin: async (credentials) => {
    const response = await api.post('/auth/admin/login', credentials);
    return response.data;
  },

  // Logout user
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  // Get current user
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Request OTP for registration
  requestOTP: async ({ email, registrationNumber }) => {
    const response = await api.post('/auth/send-otp', { email, registrationNumber });
    return response.data;
  },

  // Verify OTP
  verifyOTP: async (email, otp) => {
    const response = await api.post('/auth/verify-otp', { email, otp });
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  // Reset password
  resetPassword: async (resetToken, newPassword) => {
    const response = await api.post('/auth/reset-password', {
      resetToken,
      newPassword,
    });
    return response.data;
  },

  // Change password
  changePassword: async (oldPassword, newPassword) => {
    const response = await api.post('/auth/change-password', {
      oldPassword,
      newPassword,
    });
    return response.data;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await api.patch('/auth/profile', profileData);
    return response.data;
  },
};

export default authApi;
