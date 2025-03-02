import { createAsyncThunk } from "@reduxjs/toolkit";
import {User} from "../../types/types.ts";
import backendService from "../../api/backendService.ts";



export const registerUser = createAsyncThunk<
    User,
    { name: string; email: string; password: string; role: string }
>(
    "registration/registerUser",
    async (credentials, { rejectWithValue }) => {
        try {
           return await  backendService.register(credentials)
        } catch (error) {
            return rejectWithValue("Регистрация не удалась");
        }
    }
);



export const loginUser = createAsyncThunk<
    User,
    { email: string; password: string }
>(
    "auth/loginUser",
    async (credentials, { rejectWithValue }) => {
        try {
            return await backendService.login(credentials)
        } catch (error) {
            return rejectWithValue("Авторизация не удалась");
        }
    }
);