import { configureStore } from '@reduxjs/toolkit';
import toggleReducer from './toggleSlice.js';
import loginReducer from './loginState.js';

const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    login: loginReducer,
  },
});

export default store;
