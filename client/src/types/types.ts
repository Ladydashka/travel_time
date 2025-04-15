export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
};

export type Guide = User & {
    languages?: string;
    rating?: number;
    phone?: string;
    social_media_links?: string;
    bio?: string;
    avatar_url?:string,
};

export type Excursion = {
    guide_id: any;
    id: number;
    title: string;
    description: string;
    rating: number;
    date: string;
    duration: number;
    photo_url: string;
}

export type Comments = {
    id: number;
    rating: number;
    name: string,
    date: string,
};
