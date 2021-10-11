import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice';
import categoryReducer from './slices/categoriesSlice';

const store = configureStore({
  reducer: {
    login: loginReducer,
    category: categoryReducer,
  },
});

export default store;
