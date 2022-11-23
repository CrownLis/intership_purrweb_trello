import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentType } from '../../../Types/types';

type CommeentsSliceType = {
  comments: CommentType[] | null;
};

const initialState: CommeentsSliceType = {
  comments: null
};

const commentsSlice = createSlice({
  name: 'commentsSlice',
  initialState,
  reducers: {
    addComment(state, action: PayloadAction<CommentType>) {
      if (state.comments) {
        state.comments = [...state.comments, action.payload];
      } else {
        state.comments = [action.payload];
      }
    },
    removeComment(state, action: PayloadAction<CommentType['id']>) {
      if (state.comments) {
        state.comments = state.comments?.filter(
          (item) => item.id !== action.payload
        );
      }
    },
    removeAllCommentsCard(state, action: PayloadAction<CommentType['cardId']>) {
      if (state.comments) {
        state.comments = state.comments.filter(
          (item) => item.cardId !== action.payload
        );
      }
    },
    changeComment(state, action: PayloadAction<CommentType>) {
      state.comments?.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    }
  }
});

export const { actions, reducer } = commentsSlice;
