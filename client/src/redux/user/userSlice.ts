import {createSlice} from "@reduxjs/toolkit";
import {StateUser} from "./type.ts";
import {updateUser} from "./userThunk.ts";

const initialState: StateUser = {
	user: null,
	isUpdated: false,

};

const updateUserSlice = createSlice({
	name: 'updateUser',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(updateUser.fulfilled, (state: StateUser, action) => {
				state.user = action.payload;
				state.isUpdated = true;
			})
			.addCase(updateUser.rejected, (state: StateUser, action) => {
				state.isUpdated = false;
				state.user = null;
				console.error(action.payload)
			});
	},
});

export default updateUserSlice.reducer;