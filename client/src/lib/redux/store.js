import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default to localStorage
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist/es/constants';
import menuReducer from './slices/menuSlice';
import orderReducer from './slices/orderSlice';
import reservationReducer from './slices/reservationSlice';
import settingsReducer from './slices/settingSlice';
import userReducer from './slices/userSlice';

// Combine all reducers into one root reducer
const rootReducer = combineReducers({
  user: userReducer,
  menu: menuReducer,
  orders: orderReducer,
  reservations: reservationReducer,
  settings: settingsReducer,
});

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'menu', 'orders', 'reservations', 'settings'], // Only persist these slices
};

// Wrap the rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore redux-persist actions
      },
    }),
});

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };
