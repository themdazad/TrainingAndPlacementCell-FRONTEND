import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from '../utils/toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// --- Auth Slice ---

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isChecking: true,
    isAuthenticated: false,
    user: null,
    profile: null, // Polymorphic profile (Student/Admin/Coordinator/Recruiter)
  },
  reducers: {
    setAuthState: (state, action) => {
      const { isAuthenticated, user, profile } = action.payload;
      state.isAuthenticated = isAuthenticated;
      state.user = user;
      state.profile = profile || user?.profileRef || null;
      state.isChecking = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.profile = action.payload?.profileRef || null;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setIsChecking: (state, action) => {
      state.isChecking = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.profile = null;
      state.isChecking = false;
    },
  },
});

// --- Selectors ---
export const selectUser = (state) => state.auth.user;
export const selectProfile = (state) => state.auth.profile;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsChecking = (state) => state.auth.isChecking;
export const selectUserRole = (state) => state.auth.user?.role;

// --- Redux Thunks ---

// Check if user is authenticated on app load
export const checkAuthStatus = () => async (dispatch) => {
  dispatch(setIsChecking(true));
  try {
    const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
      withCredentials: true,
    });
    const { user } = response.data;
    dispatch(
      setAuthState({
        isAuthenticated: true,
        user,
        profile: user?.profileRef,
      })
    );
  } catch {
    dispatch(
      setAuthState({
        isAuthenticated: false,
        user: null,
        profile: null,
      })
    );
  }
};

// Logout user
export const logoutUser = () => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );

    const { success } = response.data;
    if (!success) {
      throw new Error('Logout failed');
    }
    dispatch(logout());
    toast.success('Logged out successfully');
  } catch {
    // Even if API fails, clear local state
    dispatch(logout());
    toast.error('Logout failed. Please try again.');
  }
};

export const { setAuthState, setUser, setProfile, setIsAuthenticated, setIsChecking, logout } =
  authSlice.actions;

export default authSlice.reducer;

/**
 * Explanation:
 *
 * authSlice: authSlice banaya jo authentication se related state manage karta hai.
 *
 * Initial State:
 * - isChecking: Jab app load hota hai tab user ki authentication check karne ke liye.
 * - isAuthenticated: User authenticated hai ya nahi.
 * - user: Authenticated user ka data.
 *
 * Reducers:
 * - setAuthState: Jab user login ya session valid hota hai, tab is reducer ko call karke state update karte hain.
 * - logout: Jab user logout karta hai, tab state ko reset kar dete hain.
 *
 * Redux Thunks : Special Redux actions jo async operations handle karte hain.
 * Yahan humne logoutUser thunk banaya hai jo logout API call karta hai
 * aur phir client-side state ko update karta hai browser se cookie remove karta hai.
 *
 * Reducers me synchronous state updates hote hain, jabki thunks asynchronous operations handle karte hain.
 */
