import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: 101,
  isLogin: false,
  profile: {},
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
    logIn(state, { payload = { name: 'Vasilii' } }) {
      state.isLogin = true;
      state.profile = payload;
      state.isLoading = false;
    },
    logOut(state) {
      state.isLogin = false;
      state.profile = {};
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
  },
});
export const {
  logIn, logOut, loginStart, authOpen, authClose, loginError,
} = loginSlice.actions;
export default loginSlice.reducer;
