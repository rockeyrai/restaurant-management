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
      return { ...state, user: action.payload };
    },
    logout: (state) => {
      localStorage.removeItem('persist:root');
      localStorage.clear()
      // state.user = null; 
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
