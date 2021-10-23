import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  text: '',
  severity: 'info',
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert(state, { payload }) {
      state.text = payload.text;
      state.severity = payload.severity || 'info';
    },
    clearAlert(state) {
      state.text = '';
    },
  },
});
export const {
  setAlert, clearAlert,
} = alertSlice.actions;
export default alertSlice.reducer;
