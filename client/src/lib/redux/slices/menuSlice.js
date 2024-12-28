// src/features/menuSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMenuItems = createAsyncThunk('menu/fetchMenuItems', async () => {
  const response = await fetch('/api/menu');
  return response.json();
});

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchMenuItems.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default menuSlice.reducer;
