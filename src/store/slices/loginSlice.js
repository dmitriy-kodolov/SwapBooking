import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
};
// сделал юзабельную кнопку войти с любыми параметрами для входа(так как нету сейчас бэка)
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logIn(state) {
      state.isLogin = true;
    },
    logOut(state) {
      state.isLogin = false;
    },
  },
});
export const { logIn, logOut } = loginSlice.actions;
export default loginSlice.reducer;
