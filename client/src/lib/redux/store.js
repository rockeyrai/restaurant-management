import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default to localStorage
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist/es/constants';
import userReducer from './slices/userSlices';
import menuReducer from './slices/menuSlice';
import orderReducer from './slices/orderSlice';
import reservationReducer from './slices/reservationSlice';
import settingsReducer from './slices/settingSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'menu', 'orders', 'reservations', 'settings'], // Persist these slices
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedMenuReducer = persistReducer(persistConfig, menuReducer);
const persistedOrderReducer = persistReducer(persistConfig, orderReducer);
const persistedReservationReducer = persistReducer(persistConfig, reservationReducer);
const persistedSettingsReducer = persistReducer(persistConfig, settingsReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    menu: persistedMenuReducer,
    orders: persistedOrderReducer,
    reservations: persistedReservationReducer,
    settings: persistedSettingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore redux-persist actions
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
