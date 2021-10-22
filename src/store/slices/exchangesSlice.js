import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBooksOffers } from '../../api/books/books.api';

const initialState = {
  selectedBook: undefined,
  selectedTab: 1,
  disabledTabs: [],
  offers: {},
  offersIsLoading: false,
  offersError: null,
};

export const fetchOffers = createAsyncThunk(
  'fetchOffers',
  async (userId) => {
    const offers = await getBooksOffers(userId);
    return offers;
  },
);

const exchangesSlice = createSlice({
  name: 'exchanges',
  initialState,
  reducers: {
    setBook(state, { payload = undefined }) {
      state.selectedBook = payload;
      state.selectedTab = payload ? 4 : 1;
      state.disabledTabs = payload ? [1, 2, 3] : [];
    },
    setTab(state, { payload }) {
      state.selectedTab = payload;
    },
  },
  extraReducers: {
    [fetchOffers.pending]: (state) => {
      state.offerIsLoading = true;
      state.offers = {};
      state.offerError = null;
    },
    [fetchOffers.fulfilled]: (state, { payload }) => {
      state.offerIsLoading = false;
      state.offers = payload;
    },
    [fetchOffers.rejected]: (state) => {
      state.offerIsLoading = false;
      state.offerError = 'Ошибка';
    },
  },
});
export const {
  setBook, setTab,
} = exchangesSlice.actions;
export default exchangesSlice.reducer;
