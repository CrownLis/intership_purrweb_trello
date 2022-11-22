import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";
import { CommentType } from "../../../Types/types";

export const getComments = createSelector(
  (state: RootState) => state,
  (state) => state.comments.comments
);

export const getCommentsByCardId = (
  state: RootState,
  id: CommentType["cardId"]
) => {
  return state.comments.comments?.filter((item) => item.cardId === id);
};

export const getCommentsCountByCardId = (
  state: RootState,
  id: CommentType["cardId"]
) => {
  return state.comments.comments?.filter((item) => item.cardId === id).length;
};
