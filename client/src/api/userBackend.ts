import axios from 'axios';
import {User} from "../types/types.ts";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const userBackend = {
	update: async (formData: FormData, id: string): Promise<User> => {
		try {
			const response = await axios.put<User>(
				`${baseURL}/api/users/${id}`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
					withCredentials: true,
				}
			);
			return response.data;
		} catch (error) {
			console.error('Ошибка при обновлении данных пользователя:', error);
			throw error;
		}
	},

};

export default userBackend;