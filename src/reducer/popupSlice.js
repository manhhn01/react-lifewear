import { createSlice } from '@reduxjs/toolkit';

export const popupSlice = createSlice({
  name: 'popup',
  initialState: null,
  reducers: {
    showPopup: (state, action) => {
      return action.payload;
    },
    hidePopup: (state) => {
      return null;
    },
    togglePopup: (state, action) => {
      return state===action.payload ? null : action.payload;
    },
  },
});

export const { showPopup, hidePopup, togglePopup } = popupSlice.actions;
export default popupSlice.reducer;
