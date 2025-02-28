import { createSlice } from "@reduxjs/toolkit";
import { StateRegistration, UserAndId } from "./type.ts";
import { registerUser } from "./registrationThunk.ts";

const initialState: StateRegistration = {
    user: null,
    isRegistered: false,
};

const registrationSlice = createSlice({
    name: "registration",
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.isRegistered = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state: StateRegistration, action) => {
                const { user } = action.payload;
                state.user = user;
                state.isRegistered = true;

            })
            .addCase(registerUser.rejected, (state: StateRegistration, action) => {
                console.error(action.payload);

            });
    },
});

export const { logout } = registrationSlice.actions;
export default registrationSlice.reducer;