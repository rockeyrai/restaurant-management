// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlices';
import menuReducer from './slices/menuSlice';
import orderReducer from './slices/orderSlice';
import reservationReducer from './slices/reservationSlice';
import settingsReducer from './slices/settingSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
    orders: orderReducer,
    reservations: reservationReducer,
    settings: settingsReducer,
  },
});

export default store;
