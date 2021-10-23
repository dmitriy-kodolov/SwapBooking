import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import loginReducer from './slices/loginSlice';
import categoryReducer from './slices/categoriesSlice';
import profileInfoReducer from './slices/userProfileSlice';
import exchangesReducer from './slices/exchangesSlice';
import alertReducer from './slices/alertSlice';

const reducers = combineReducers({
  login: loginReducer,
  category: categoryReducer,
  profileInfo: profileInfoReducer,
  exchanges: exchangesReducer,
  alert: alertReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
