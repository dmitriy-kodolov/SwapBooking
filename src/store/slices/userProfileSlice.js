/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getProfileInfo from 'api/getProfileInfo/getProfileInfo';

const initialState = {
  userProfile: null,
  isLoading: null,
  error: null,
};

export const fetchProfileInfo = createAsyncThunk(
  'fetchProfileInfo',
  async (userId) => {
    const profileInfo = await getProfileInfo(userId);
    return profileInfo.data;
  },
);

const profileInfoSlice = createSlice({
  name: 'setProfileInfo',
  initialState,
  extraReducers: {
    [fetchProfileInfo.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchProfileInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userProfile = action.payload;
    },
    [fetchProfileInfo.rejected]: (state) => {
      state.isLoading = false;
      state.error = 'ошибка';
    },
  },
  reducers: {
    userClear(state) {
      state.userProfile = null;
      state.isLoading = null;
      state.error = null;
    },
  },
});

export const {
  userClear,
} = profileInfoSlice.actions;

export default profileInfoSlice.reducer;
