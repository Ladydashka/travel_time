import { createSlice } from "@reduxjs/toolkit";
import {StateAuth} from "./type.ts";
import {loginUser} from "./registrationThunk.ts";


const loadState = (): StateAuth => {
    const state = sessionStorage.getItem('authState');
    if (state) {
        return JSON.parse(state);
    }
    return { user: null, isRegistered: false };
};

const initialState: StateAuth = loadState();

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state: StateAuth, action) => {
                state.user = action.payload;
                state.isRegistered = true;
                sessionStorage.setItem('authState', JSON.stringify(state));
            })
            .addCase(loginUser.rejected, (state: StateAuth, action) => {
                state.user = null;
                state.isRegistered = false;
                sessionStorage.removeItem('authState');
            });
    },
});

export default  authSlice.reducer;
