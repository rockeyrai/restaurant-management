// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default to localStorage
import userReducer from './slices/userSlices';
import menuReducer from './slices/menuSlice';
import orderReducer from './slices/orderSlice';
import reservationReducer from './slices/reservationSlice';
import settingsReducer from './slices/settingSlice';

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  // You can whitelist/blacklist specific slices here
  whitelist: ['user', 'menu', 'orders', 'reservations', 'settings'], // Persist all slices
};

// Persist each reducer with redux-persist
const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedMenuReducer = persistReducer(persistConfig, menuReducer);
const persistedOrderReducer = persistReducer(persistConfig, orderReducer);
const persistedReservationReducer = persistReducer(persistConfig, reservationReducer);
const persistedSettingsReducer = persistReducer(persistConfig, settingsReducer);

// Create the store with persisted reducers
const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    menu: persistedMenuReducer,
    orders: persistedOrderReducer,
    reservations: persistedReservationReducer,
    settings: persistedSettingsReducer,
  },
});

// Create persistor to persist the state
const persistor = persistStore(store);

export { store, persistor };
