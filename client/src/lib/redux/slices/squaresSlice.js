// redux/slices/squaresSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  squares: Array(25).fill(null), // For a 5x5 grid
  isEditing: false,
};

const squaresSlice = createSlice({
  name: 'squares',
  initialState,
  reducers: {
    toggleEditMode(state) {
      state.isEditing = !state.isEditing;
    },
    updateSquare(state, action) {
      const { index, type } = action.payload;
      state.squares[index] = type;
    },
    clearSquare(state, action) {
      const { index } = action.payload;
      state.squares[index] = null;
    },
  },
});

export const { toggleEditMode, updateSquare, clearSquare } = squaresSlice.actions;
export default squaresSlice.reducer;
