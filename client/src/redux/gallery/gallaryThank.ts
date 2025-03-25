import { createAsyncThunk } from "@reduxjs/toolkit";
import {Image} from "./type.ts";
import imagesAPI from "../../api/imagesAPI.ts";


export const getImagesThank = createAsyncThunk<Image[], void, { rejectValue: string }>(
    'images/get',
    async (query: string, { rejectWithValue }) => {
        try {
           return await imagesAPI.getImages(query)
        } catch (error) {
            return rejectWithValue("Ошибка получения:", error);
        }
    }
);