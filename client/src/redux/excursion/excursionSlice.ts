import { createSlice } from "@reduxjs/toolkit";
import {StateExcursion} from "./type.ts";
import {getAllExcursion} from "./excursionThunk.ts";

const initialState: StateExcursion = {
    excursions: [],
    isFetched: false,
}

const getExcursionsSlice = createSlice({
    name: 'excursion',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllExcursion.fulfilled, (state: StateExcursion, action) => {
                state.excursions = action.payload;
                state.isFetched = true;
            })
            .addCase(getAllExcursion.rejected, (state: StateExcursion, action) => {
                state.excursions = [];
                state.isFetched = false;
                console.error(action.payload)
            });
    }
})

export default getExcursionsSlice.reducer;