import {Excursion} from "../../types/types.ts";

export type StateExcursion =  {
    excursions: Excursion[] | [];
    isFetched: boolean;
}