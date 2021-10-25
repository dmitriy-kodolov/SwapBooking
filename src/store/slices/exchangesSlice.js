import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  exchangeConfirm, getActiveOffer, getAllOffersId, getBooksOffers,
} from '../../api/books/books.api';

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
  allOffersId: [],
  allOffersIdIsLoading: false,
  allOffersIdError: null,
  exchangeConfirmIsLoading: false,
  exchangeConfirm: {},
  exchangeConfirmError: null,
};

export function withToastForError(payloadCreator) {
  return async (args, thunkAPI) => {
    try {
      return await payloadCreator(args, thunkAPI);
    } catch (err) {
      console.log(err);
      throw err; // throw error so createAsyncThunk will dispatch '/rejected'-action
    }
  };
}

export const fetchOffers = createAsyncThunk(
  'fetchOffers',
  withToastForError(async (userId) => {
    const offers = await getBooksOffers(userId);
    return offers;
  }),
);

export const fetchActiveOffer = createAsyncThunk(
  'fetchActiveOffer',
  withToastForError(async (userId, offerId) => {
    const offer = await getActiveOffer(userId, offerId);
    return offer;
  }),
);

export const fetchExchangeConfirm = createAsyncThunk(
  'fetchExchangeConfirm',
  withToastForError(async ([firstId, secondId]) => {
    const offer = await exchangeConfirm(firstId, secondId);
    return offer;
  }),
);

export const fetchAllOffersId = createAsyncThunk(
  'fetchAllOffersId',
  withToastForError(async (userId) => {
    const offer = await getAllOffersId(userId);
    return offer;
  }),
);

const exchangesSlice = createSlice({
  name: 'exchanges',
  initialState,
  reducers: {
    setBook(state, { payload = undefined }) {
      state.selectedBook = payload;
      state.selectedTab = payload ? 2 : 1;
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
      state.selectedBook = undefined;
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
    [fetchExchangeConfirm.pending]: (state) => {
      state.exchangeConfirmIsLoading = true;
      state.exchangeConfirm = {};
      state.exchangeConfirmError = null;
    },
    [fetchExchangeConfirm.fulfilled]: (state, { payload }) => {
      state.exchangeConfirmIsLoading = false;
      state.exchangeConfirm = payload;
      state.disabledTabs = payload ? [1, 2, 3] : [];
      state.selectedTab = payload ? 4 : 2;
    },
    [fetchExchangeConfirm.rejected]: (state) => {
      state.exchangeConfirmIsLoading = false;
      state.exchangeConfirmError = 'Ошибка';
    },
    [fetchAllOffersId.pending]: (state) => {
      state.allOffersIdIsLoading = true;
      state.allOffersIdError = null;
      state.selectedBook = undefined;
    },
    [fetchAllOffersId.fulfilled]: (state, { payload }) => {
      state.allOffersIdIsLoading = false;
      state.allOffersId = payload;
      state.disabledTabs = payload ? [1, 2, 3] : [];
      state.selectedTab = payload ? 4 : state.selectedTab;
      state.activeOfferError = null;
    },
    [fetchAllOffersId.rejected]: (state) => {
      state.allOffersIdIsLoading = false;
      state.allOffersIdError = 'Ошибка';
    },
  },
});
export const {
  setBook, setTab,
} = exchangesSlice.actions;
export default exchangesSlice.reducer;
