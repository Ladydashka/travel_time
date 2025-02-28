import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {User} from "./type.ts";

export const registerUser = createAsyncThunk<
    User,
    { name: string; email: string; password: string; role: string }
>(
    "registration/registerUser",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post<User>(
                "http://localhost:8000/api/auth/sign-up",
                credentials,
                {
                    withCredentials: true,
                }
            );
            return response.data;
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
            const response = await axios.post<User>(
                "http://localhost:8000/api/auth/sign-in",
                credentials,
                {
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue("Авторизация не удалась");
        }
    }
);