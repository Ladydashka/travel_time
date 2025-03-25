export type Image = {
    id: string;
    urls: {
        regular: string;
        small: string;
        thumb: string;
    };
    alt_description: string | null;
    user: {
        name: string;
    };
}

export type ImagesState = {
    images: Image[] | [],
    isFetched: boolean;
}