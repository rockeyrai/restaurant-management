// src/lib/redux/slices/userSlices.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Start with null, will be set after login
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload; // Save user data in state
    },
    logout: (state) => {
      state.user = null; // Clear user data on logout
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
