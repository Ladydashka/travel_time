import { createSlice } from '@reduxjs/toolkit';
import { findGuide, updateGuide } from './guideThunk.ts';
import { StateGuide } from './type.ts';

const initialState: StateGuide = {
    guide: null,
    isUpdated: false,
    isFetched: false
};

const updateGuideSlice = createSlice({
    name: 'updateGuide',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateGuide.fulfilled, (state: StateGuide, action) => {
                state.guide = action.payload;
                state.isUpdated = true;
            })
            .addCase(updateGuide.rejected, (state: StateGuide, action) => {
                state.isUpdated = false;
                state.guide = null;
                console.error(action.payload)
            });
    },
});

const findOneGuideSlice = createSlice({
    name: 'guide',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(findGuide.fulfilled, (state: StateGuide, action) => {
                state.guide = action.payload;
                state.isFetched = true;

            })
            .addCase(findGuide.rejected, (state:StateGuide, action) => {
                state.guide = null;
                state.isFetched = false;
                console.error(action.payload);

            });
    },
});

export const findOneGuideReducer = findOneGuideSlice.reducer;
export default updateGuideSlice.reducer;
