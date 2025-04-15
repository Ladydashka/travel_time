import { createSlice } from "@reduxjs/toolkit";
import {ImagesState} from "./type.ts";
import {getImagesThank} from "./galleryThunk.ts";


const initialState: ImagesState = {
    images: [],
    isFetched: false,
}

const getImagesSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getImagesThank.fulfilled, (state: ImagesState, action) => {
                state.images = action.payload;
                state.isFetched = true;
            })
            .addCase(getImagesThank.rejected, (state: ImagesState, action) => {
                state.images = [];
                state.isFetched = false;
                console.error(action.payload)
            });
    }
})

export default getImagesSlice.reducer;