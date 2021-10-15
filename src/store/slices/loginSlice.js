import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: 101,
  isLogin: false,
  profile: {},
  isLoading: false,
  isAuthModalOpen: false,
};
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
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
  },
});
export const {
  logIn, logOut, loginStart, authOpen, authClose,
} = loginSlice.actions;
export default loginSlice.reducer;
