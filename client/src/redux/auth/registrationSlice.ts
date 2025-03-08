import { createSlice } from "@reduxjs/toolkit";
import {StateAuth} from "./type.ts";
import { registerUser } from "./registrationThunk.ts";

const loadState = (): StateAuth => {
    const state = sessionStorage.getItem('registrationState');
    if (state) {
        return JSON.parse(state);
    }
    return { user: null, isRegistered: false };
};

const initialState: StateAuth = loadState();

const registrationSlice = createSlice({
    name: "registration",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state: StateAuth, action) => {
                state.user = action.payload;
                state.isRegistered = true;
                sessionStorage.setItem('registrationState', JSON.stringify(state));

            })
            .addCase(registerUser.rejected, (state: StateAuth, action) => {
                console.error(action.payload);

                sessionStorage.removeItem('registrationState');
            });
    },
});


export default registrationSlice.reducer;