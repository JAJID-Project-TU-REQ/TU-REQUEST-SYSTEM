import { createSlice } from '@reduxjs/toolkit';

const toggleSlice = createSlice({
  name: 'sidebarToggle',
  initialState: { value: false },
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggle } = toggleSlice.actions;
export default toggleSlice.reducer;
