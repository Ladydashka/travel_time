import { createAsyncThunk } from '@reduxjs/toolkit';
import commentsBackend from '../../api/commentsBackend.ts';
import {FullCommentData} from "../../components/ExcursionDetails/CommentComponent/types.ts";
import { Comments } from '../../types/types.ts';

export const createComment = createAsyncThunk<
  Comments,
  FullCommentData,
  { rejectValue: string }
>(
  'comment/create',
  async (fullData, { rejectWithValue }) => {
    try {
      return await commentsBackend.create(fullData);
    } catch (error) {
      return rejectWithValue('ошибка');
    }
  }
);

export const getComments = createAsyncThunk<Comments[], void>(
  'comments/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await commentsBackend.getAllComments();
    } catch (error) {
      return rejectWithValue('Не удалось получить данные экскурсий.');
    }
  }
);