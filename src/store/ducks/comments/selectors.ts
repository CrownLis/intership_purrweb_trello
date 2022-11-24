import { RootState } from '../../store';
import { createSelector } from '@reduxjs/toolkit';

const selectComments = (state: RootState) => state.comments.comments;
const selectCardId = (_: RootState, cardId: number) => cardId;

export const selectCommentsByCardId = createSelector(
  [selectComments, selectCardId],
  (comments, cardId) => comments?.filter((comment) => comment.cardId === cardId)
);
