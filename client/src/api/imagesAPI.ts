import axios from "axios";

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const imagesAPI = {
    getImages: async (query: string = 'Saint-Petersburg', perPage: number = 9) => {
        try {
            const response = await axios.get('https://api.unsplash.com/search/photos', {
                params: {
                    query,
                    per_page: perPage,
                    page: 1,
                },
                headers: {
                    Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
                }
            });
            return response.data.results;
        } catch (error) {
            console.error("Unsplash API Error:", error);
        }
    }
};

export default imagesAPI;