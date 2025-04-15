import {User} from "../../types/types.ts";

export type StateUser = {
	user: User | null;
	isUpdated: boolean;
};
