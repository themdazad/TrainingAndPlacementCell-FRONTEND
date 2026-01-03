import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';

// --- Auth Slice ---

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isChecking: true,
    isAuthenticated: false, // by default false
    user: null, // by default null
  },
  reducers: {
    setAuthState: (state, action) => {
      // isme data aayega payload ke through
      const { isAuthenticated, user } = action.payload;
      state.isAuthenticated = isAuthenticated;
      state.user = user;
      state.isChecking = false;
    },
    logout: (state) => {
      // logout karne pe state reset kar dena without payload
      state.isAuthenticated = false;
      state.user = null;
      state.isChecking = false;
    },
  },
});

// --- Redux Thunks ---
export const logoutUser = () => async (dispatch) => {
  try {
    // 1. API call: backend cookie se token remove karega and logout karega
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`);

    const { message, success } = response.data;

    if (!success) {
      throw new Error(message || 'Logout failed');
    }
    // 2. Client-side state saaf karo
    dispatch(logout());
    toast.error(JSON.stringify(message));
  } catch (error) {
    toast.error('Logout failed. Please try again.');
  }
};

export const { setAuthState, logout } = authSlice.actions;
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
 * Thunks: Special Redux actions jo async operations handle karte hain.
 * Yahan humne logoutUser thunk banaya hai jo logout API call karta hai
 * aur phir client-side state ko update karta hai browser se cookie remove karta hai.
 *
 * Reducers me synchronous state updates hote hain, jabki thunks asynchronous operations handle karte hain.
 */
