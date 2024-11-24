import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false,
};

const loginState = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login: (state, action) => {
            state.value = true;
        },
        logout: (state) => {
            state.value = false;
        },
    },
});

export const { login, logout } = loginState.actions;

export default loginState.reducer;