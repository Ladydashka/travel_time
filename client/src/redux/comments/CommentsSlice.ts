import { createSlice } from '@reduxjs/toolkit';
import { StateAllComments, StateComment } from './type.ts';
import { createComment, getComments } from './commentsThunk.ts';



const initialCommentState: StateComment = {
  isFetched: false,
};


const commentSlice = createSlice({
  name: 'comment',
  initialState: initialCommentState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.fulfilled, (state: StateComment, action) => {
        state.isFetched = true;
      })
      .addCase(createComment.rejected, (state: StateComment, action) => {
        state.isFetched = false;
        console.error(action.payload)
      });
  },
});


const initialAllCommentsState: StateAllComments = {
  comments: [],
  isFetched: false,
};


const allCommentsSlice = createSlice({
  name: 'allComments',
  initialState: initialAllCommentsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComments.fulfilled, (state: StateAllComments, action) => {
        state.comments = action.payload;
        state.isFetched = true;
      })
      .addCase(getComments.rejected, (state: StateAllComments, action) => {
        state.comments = [];
        state.isFetched = false;
        console.error(action.payload);
      });
  },
});


export const commentReducer = commentSlice.reducer;
export const allCommentsReducer = allCommentsSlice.reducer;