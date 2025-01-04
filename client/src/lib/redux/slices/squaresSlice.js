// squaresSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  squares: Array(100).fill(null), // 10x10 grid, initially empty
  isEditing: false,
};

const squaresSlice = createSlice({
  name: 'squares',
  initialState,
  reducers: {
    toggleEditMode: (state) => {
      state.isEditing = !state.isEditing;
    },
    updateSquare: (state, action) => {
      const { indexes, type } = action.payload;

      if (Array.isArray(indexes)) {
        indexes.forEach(index => {
          state.squares[index] = type;
        });
      } else {
        console.error('Error: indexes is not an array', indexes);
      }
    },
    clearSquare: (state, action) => {
      const { index } = action.payload;
      state.squares[index] = null;
    },
  },
});

export const { toggleEditMode, updateSquare, clearSquare } = squaresSlice.actions;

export default squaresSlice.reducer;
