/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getCategoriesOfBook from '../../api/categoriesOfBook/getCategoriesOfBook';

const initialState = {
  categories: null,
  isLoading: null,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const categoriesOfBook = await getCategoriesOfBook();
    return categoriesOfBook.data;
  },
);

const categoriesSlice = createSlice({
  name: 'setCategories',
  initialState,
  extraReducers: {
    [fetchCategories.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    },
    [fetchCategories.rejected]: (state) => {
      state.isLoading = false;
      state.error = 'ошибка на сервере';
    },
  },
});

export default categoriesSlice.reducer;
