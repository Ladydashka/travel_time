import {createAsyncThunk} from "@reduxjs/toolkit";
import {User} from "../../types/types.ts";
import userBackend from "../../api/userBackend.ts";

export const updateUser = createAsyncThunk<User, { formData: FormData; id: string }>(
	"user/update",
	async ({ formData, id }, { rejectWithValue }) => {
		try {
			return await userBackend.update(formData, id);
		} catch (error) {
			return rejectWithValue("Не удалось обновить пользователя");
		}
	}
);


