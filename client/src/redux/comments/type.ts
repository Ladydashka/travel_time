import {Comments} from "../../types/types.ts";

export type StateComment = {
  isFetched: boolean;
};

export type StateAllComments = {
  comments: [] | Comments[];
  isFetched: boolean;
};
