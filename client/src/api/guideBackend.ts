import { Guide } from '../types/types.ts';
import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_URL;

const guideBackend = {
	update: async (formData: FormData, id: string): Promise<Guide> => {
		try {
			const response = await axios.put<Guide>(
				`${baseURL}/api/guides/${id}`,
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
			console.error('Ошибка при обновлении данных гида:', error);
			throw error;
		}
	},

	getGuideById: async (guideId: string): Promise<Guide> => {
		const response = await axios.get<Guide>(
			`${baseURL}/api/guides/${guideId}`,
			{ withCredentials: true }
		);
		return response.data;
	},
};

export default guideBackend;
