import {User} from "../../types/types.ts";

export type StateAuth = {
    user: User | null;
    isRegistered: boolean;
}

