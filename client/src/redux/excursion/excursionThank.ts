import {createAsyncThunk} from "@reduxjs/toolkit";
import excursionBackend from "../../api/excursionBackend.ts";
import {Excursion} from "../../types/types.ts";



export const createExcursion = createAsyncThunk<
    Excursion,
    {formData}
>(
    "excursion/create",
    async (formData, { rejectWithValue }) => {
        try {
            return await  excursionBackend.create(formData)
        } catch (error) {
            return rejectWithValue("Неизвестная ошибка");
        }
    }
)


export const getAllExcursion = createAsyncThunk<Excursion[], void >(
    "excursions/fetchAll", async (_, { rejectWithValue }) => {
    try {
        return await excursionBackend.getAllExcursions()


    } catch (error) {
        return rejectWithValue("Не удалось получить данные экскурсий.");
    }
}

)