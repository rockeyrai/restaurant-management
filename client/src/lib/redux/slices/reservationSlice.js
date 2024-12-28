// src/features/reservationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const reservationSlice = createSlice({
  name: 'reservations',
  initialState: {
    reservations: [],
  },
  reducers: {
    addReservation: (state, action) => {
      state.reservations.push(action.payload);
    },
    cancelReservation: (state, action) => {
      state.reservations = state.reservations.filter(res => res.reservation_id !== action.payload.reservation_id);
    },
    updateReservationStatus: (state, action) => {
      const index = state.reservations.findIndex(res => res.reservation_id === action.payload.reservation_id);
      if (index !== -1) {
        state.reservations[index].status = action.payload.status;
      }
    },
  },
});

export const { addReservation, cancelReservation, updateReservationStatus } = reservationSlice.actions;
export default reservationSlice.reducer;
