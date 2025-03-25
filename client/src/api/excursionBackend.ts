import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const excursionBackend = {
    create: async (formData: FormData): Promise<any> => {
        try {
            const response = await axios.post(`${baseURL}/api/tours`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error("Ошибка при создании экскурсии:", error);

        }
    },

    getAllExcursions: async (): Promise<any> => {
        try {
            const response = await axios.get(`${baseURL}/api/tours`)
            return response.data;
        } catch (error) {
            console.error("Ошибка при получении всех туров:", error);
            throw error;
        }
    }
}
export default excursionBackend;