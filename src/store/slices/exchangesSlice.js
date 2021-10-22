import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getActiveOffer, getBooksOffers } from '../../api/books/books.api';

const initialState = {
  selectedBook: undefined,
  selectedTab: 1,
  disabledTabs: [],
  offers: {},
  offersIsLoading: false,
  offersError: null,
  activeOffer: {},
  activeOffersIsLoading: false,
  activeOffersError: null,
};

export const fetchOffers = createAsyncThunk(
  'fetchOffers',
  async (userId) => {
    const offers = await getBooksOffers(userId);
    return offers;
  },
);

export function withToastForError(payloadCreator) {
  return async (args, thunkAPI) => {
    try {
      return await payloadCreator(args, thunkAPI);
    } catch (err) {
      console.log(err);
      // showToastForError(err);
      throw err; // throw error so createAsyncThunk will dispatch '/rejected'-action
    }
  };
}

export const fetchActiveOffer = createAsyncThunk(
  'fetchActiveOffer',
  withToastForError(async (userId, offerId) => {
    const offer = await getActiveOffer(userId, offerId);
    return offer;
  }),
);

const exchangesSlice = createSlice({
  name: 'exchanges',
  initialState,
  reducers: {
    setBook(state, { payload = undefined }) {
      state.selectedBook = payload;
      state.selectedTab = payload ? 4 : 1;
      state.disabledTabs = payload ? [1, 2, 3] : [];
      if (!payload) {
        state.activeOffer = {};
      }
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
    [fetchActiveOffer.pending]: (state) => {
      state.activeOfferIsLoading = true;
      state.activeOffer = {};
      state.activeOfferError = null;
    },
    [fetchActiveOffer.fulfilled]: (state, { payload }) => {
      state.activeOfferIsLoading = false;
      state.activeOffer = payload;
      state.disabledTabs = payload ? [1, 2, 3] : [];
    },
    [fetchActiveOffer.rejected]: (state) => {
      state.activeOfferIsLoading = false;
      state.activeOfferError = 'Ошибка';
    },
  },
});
export const {
  setBook, setTab,
} = exchangesSlice.actions;
export default exchangesSlice.reducer;
