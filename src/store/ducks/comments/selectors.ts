import { RootState } from '../../store';
import { createSelector } from '@reduxjs/toolkit';
import { CommentType } from '../../../Types/types';

export const selectorGetComments = 
  (state: RootState) => {
    return state.comments.comments;
  };

export const selectorGetCommentsByCardId = (
  state: RootState,
  id: CommentType['cardId']
) => {
  return state.comments.comments?.filter((item) => item.cardId === id);
};

export const selectorGetCommentsCountByCardId = (
  state: RootState,
  id: CommentType['cardId']
) => {
  return state.comments.comments?.filter((item) => item.cardId === id).length;
};
