import {createAsyncThunk} from "@reduxjs/toolkit";

import guideBackend from "../../api/guideBackend.ts";
import {Guide} from "../../types/types.ts";

export const updateGuide = createAsyncThunk<Guide, { formData: FormData; id: string }>(
    "guide/update",
    async ({ formData, id }, { rejectWithValue }) => {
        try {
            console.log(formData, id,"id")
            return await guideBackend.update(formData, id);
        } catch (error) {
            return rejectWithValue("Не удалось обновить гида");
        }
    }
);

export const findGuide = createAsyncThunk<
    Guide,
    string,
    { rejectValue: string }
>(
    'guide/findOne',
    async (guideId, { rejectWithValue }) => {
        try {
            return  await guideBackend.getGuideById(guideId);
        } catch (error) {
            return rejectWithValue('Гид не найден');
        }
    }
)