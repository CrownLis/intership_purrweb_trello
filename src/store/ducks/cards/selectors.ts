import { createSelector } from "@reduxjs/toolkit";
import { CardType } from "../../../Types/types";
import { RootState } from "../../store";

export const getComments = createSelector(
  (state: RootState) => state,
  (state) => state.cards.cards
);

export const getCardsByColumnId = (
  state: RootState,
  columnId: CardType["columnId"]
) => {
  return state.cards.cards?.filter((item) => item.columnId === columnId);
};
