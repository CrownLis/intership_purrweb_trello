import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const selectCards = (state: RootState) => state.cards.cards;
const selectColumnId = (_: RootState, columnId: number) => columnId;

export const selectGetCards = (state: RootState) => {
  return state.cards.cards;
};

export const selectCardsByColumnId = createSelector(
  [selectCards, selectColumnId],
  (cards, columnId) => cards?.filter((card) => card.columnId === columnId)
);
