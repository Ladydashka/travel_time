import axios from "axios";
import {User} from "../types/types.ts";


const baseURL = import.meta.env.VITE_BACKEND_URL;


const backendService = {
    register: async (credentials: {
        name: string;
        email: string;
        password: string;
        role: string
    }): Promise<User> => {
        const response = await axios.post<User>(`${baseURL}/api/auth/sign-up`, credentials, {withCredentials: true});
        return response.data;
    },

    login: async (credentials: { email: string; password: string }): Promise<User> => {
        const response = await axios.post<User>(`${baseURL}/api/auth/sign-in`, credentials, {withCredentials: true});
        return response.data;
    },

}
export default backendService;