/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getProfileInfo from 'api/getProfileInfo/getProfileInfo';

const initialState = {
  profile: null,
  isLoading: null,
  error: null,
};
export const fetchProfileInfo = createAsyncThunk(
  'fetchProfileInfo',
  async () => {
    const profileInfo = await getProfileInfo();
    return profileInfo;
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
      state.profile = action.payload;
    },
    [fetchProfileInfo.rejected]: (state) => {
      state.isLoading = false;
      state.error = 'ошибка';
    },
  },
});

export default profileInfoSlice.reducer;
