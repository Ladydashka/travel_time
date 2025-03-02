import { createSlice } from "@reduxjs/toolkit";
import {StateAuth} from "./type.ts";
import {loginUser} from "./registrationThunk.ts";


const initialState: StateAuth = {
    user: null,
    isRegistered: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state: StateAuth, action) => {
                const { user } = action.payload;
                state.user = user;
                state.isRegistered = true;
            })
            .addCase(loginUser.rejected, (state: StateAuth, action) => {
                state.user = null;
                state.isRegistered = false;
            });
    },
});

export default  authSlice.reducer;
