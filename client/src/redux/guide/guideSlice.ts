import {createSlice} from "@reduxjs/toolkit";
import {updateGuide} from "./guideThank.ts";
import {StateGuide} from "./type.ts";

const initialState: StateGuide = {
    guide: null,
    isUpdated: false,
}


const updateGuideSlice = createSlice({
    name: 'updateGuide',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
            .addCase(updateGuide.fulfilled, (state:StateGuide, action) => {
                state.guide = action.payload;
                state.isUpdated = true;

            })
            .addCase(updateGuide.rejected, (state:StateGuide, action) => {
                state.isUpdated = false;

            });
    }
})

export default updateGuideSlice.reducer;