import { createSlice } from "@reduxjs/toolkit";
import {StateAuth} from "./type.ts";
import { registerUser } from "./registrationThunk.ts";


const initialState: StateAuth = {
    user: null,
    isRegistered: false,
}

const registrationSlice = createSlice({
    name: "registration",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state: StateAuth, action) => {
                state.user = action.payload;
                state.isRegistered = true;
            })
            .addCase(registerUser.rejected, (state: StateAuth, action) => {
                state.user = null;
                console.error(action.payload);
            });
    },
});


export default registrationSlice.reducer;