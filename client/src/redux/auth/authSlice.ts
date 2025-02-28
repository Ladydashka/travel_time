import { createSlice } from "@reduxjs/toolkit";
import {StateAuth} from "./type.ts";
import {loginUser} from "./registrationThunk.ts"; // Импортируйте действие логаута из среза регистрации


const initialState: StateAuth = {
    user: null,
    isAuthenticated: false,
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
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state: StateAuth, action) => {
                state.user = null;
                state.isAuthenticated = false;
            });
    },
});

export default  authSlice.reducer;
