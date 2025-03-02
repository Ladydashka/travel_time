import { createSlice } from "@reduxjs/toolkit";
import {StateAuth} from "./type.ts";
import { registerUser } from "./registrationThunk.ts";

const initialState: StateAuth = {
    user: null,
    isRegistered: false,
};

const registrationSlice = createSlice({
    name: "registration",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state: StateAuth, action) => {
                const { user } = action.payload;
                state.user = user;
                state.isRegistered = true;

            })
            .addCase(registerUser.rejected, (state: StateAuth, action) => {
                console.error(action.payload);

            });
    },
});


export default registrationSlice.reducer;