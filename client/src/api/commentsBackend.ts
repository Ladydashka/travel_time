import axios from 'axios';
import {FullCommentData} from "../components/ExcursionDetails/CommentComponent/types.ts";
import {Comments} from "../types/types.ts";


const baseURL = import.meta.env.VITE_BACKEND_URL;

const commentsBackend = {
  create: async (fullData: FullCommentData): Promise<Comments > => {
    try {
      const response = await axios.post<Comments >(`${baseURL}/api/comments`, fullData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Ошибка при создании комментария:', error);
      throw error;
    }
  },

  getAllComments: async (): Promise<Comments[]> => {
    try {
      const response = await axios.get(`${baseURL}/api/comments`);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении всех туров:', error);
      throw error;
    }
  },
};


export default commentsBackend;