export type User = {
    name: string;
    email: string;
    password: string;
    role: string;
};

export type UserAndId = User & { id: number };



export type StateRegistration = {
    user: UserAndId | null;
    isRegistered: boolean;
};

export type StateAuth = {
    user: User | null;
    isAuthenticated: boolean;
}

