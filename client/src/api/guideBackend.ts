import {Guide} from "../types/types.ts";
import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const guideBackend ={
    update: async (credentials: {
        id: number,
        name: string;
        email: string;
        languages?: string;
        rating?: number;
        phone?: string;
        social_media_links?: string;
        bio?: string;

    }): Promise<Guide> => {
    const response = await axios.put<Guide>(`${baseURL}/api/guides/:id`, credentials, {withCredentials: true});
    return response.data;


},
    
}

export default guideBackend;