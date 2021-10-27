import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: undefined,
  isLogin: false,
  isLoading: false,
  isAuthModalOpen: false,
  isError: false,
  error: null,
};
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.isError = false;
      state.error = null;
    },
    logIn(state, { payload }) {
      state.isLogin = true;
      state.userId = payload;
      state.isLoading = false;
    },
    logOut(state) {
      state.isLogin = false;
      state.isLoading = false;
    },
    authOpen(state) {
      state.isAuthModalOpen = true;
    },
    authClose(state) {
      state.isAuthModalOpen = false;
    },
    loginError(state, { payload }) {
      state.isLoading = false;
      state.isError = true;
      state.error = payload;
    },
    loginClear(state) {
      state.userId = undefined;
      state.isLogin = false;
      state.isLoading = false;
      state.isAuthModalOpen = false;
      state.isError = false;
      state.error = null;
    },
  },
});
export const {
  logIn, logOut, loginStart, authOpen, authClose, loginError, loginClear,
} = loginSlice.actions;
export default loginSlice.reducer;
