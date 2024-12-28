// src/features/orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    activeOrders: [],
    completedOrders: [],
  },
  reducers: {
    addOrder: (state, action) => {
      state.activeOrders.push(action.payload);
    },
    completeOrder: (state, action) => {
      const index = state.activeOrders.findIndex(order => order.order_id === action.payload.order_id);
      if (index !== -1) {
        state.completedOrders.push(state.activeOrders[index]);
        state.activeOrders.splice(index, 1);
      }
    },
  },
});

export const { addOrder, completeOrder } = orderSlice.actions;
export default orderSlice.reducer;
