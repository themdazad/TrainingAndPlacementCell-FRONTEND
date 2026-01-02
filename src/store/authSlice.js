import { createSlice } from '@reduxjs/toolkit';

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
    },
  },
});

export const { setAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
