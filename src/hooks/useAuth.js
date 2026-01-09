/**
 * useAuth Hook
 * Authentication and user management
 */
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authAPI as authApi } from '../api';
import { setUser, setIsAuthenticated, setIsChecking, logout } from '../store/authSlice';
import { toast } from '../utils/toast';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isChecking } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authApi.login(credentials);
      dispatch(setUser(data.user));
      dispatch(setIsAuthenticated(true));
      toast.success('Login successful!');
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authApi.register(userData);
      toast.success('Registration successful! Please verify your email.');
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logoutUser = useCallback(async () => {
    setLoading(true);
    try {
      await authApi.logout();
      dispatch(logout());
      toast.success('Logged out successfully');
    } catch (err) {
      // Even if API fails, clear local state
      dispatch(logout());
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const checkAuth = useCallback(async () => {
    dispatch(setIsChecking(true));
    try {
      const data = await authApi.getMe();
      dispatch(setUser(data.user));
      dispatch(setIsAuthenticated(true));
    } catch (err) {
      dispatch(setUser(null));
      dispatch(setIsAuthenticated(false));
    } finally {
      dispatch(setIsChecking(false));
    }
  }, [dispatch]);

  const requestOTP = useCallback(async (email) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authApi.requestOTP(email);
      toast.success('OTP sent to your email');
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to send OTP';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const verifyOTP = useCallback(async (email, otp) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authApi.verifyOTP(email, otp);
      toast.success('OTP verified successfully');
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Invalid OTP';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const forgotPassword = useCallback(async (email) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authApi.forgotPassword(email);
      toast.success('Password reset link sent to your email');
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to send reset link';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (resetToken, newPassword) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authApi.resetPassword(resetToken, newPassword);
      toast.success('Password reset successfully');
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Password reset failed';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const changePassword = useCallback(async (oldPassword, newPassword) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authApi.changePassword(oldPassword, newPassword);
      toast.success('Password changed successfully');
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Password change failed';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    isAuthenticated,
    isChecking,
    loading,
    error,
    login,
    register,
    logout: logoutUser,
    checkAuth,
    requestOTP,
    verifyOTP,
    forgotPassword,
    resetPassword,
    changePassword,
  };
};

export default useAuth;
