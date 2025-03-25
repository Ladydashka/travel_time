import {createAsyncThunk} from "@reduxjs/toolkit";

import guideBackend from "../../api/guideBackend.ts";
import {Guide} from "../../types/types.ts";

export const updateGuide = createAsyncThunk<Guide,
    { id: number, name: string; email: string; languages?: string;  rating?: number;  phone?: string; social_media_links?: string; bio?: string; }
>(
    "guide/update",
    async (credentials, { rejectWithValue }) => {
        try {
            return await  guideBackend.update(credentials)
        } catch (error) {
            return rejectWithValue("Не удалось обновить гида");
        }
    }
);