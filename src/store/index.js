import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice';
import categoryReducer from './slices/categoriesSlice';
// import profileInfoReducer from './slices/userProfileSlice';

const store = configureStore({
  reducer: {
    login: loginReducer,
    category: categoryReducer,
    // падает ошибка не правильное использоввание хука profileInfo: profileInfoReducer,
  },
});

export default store;
