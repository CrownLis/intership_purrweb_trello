import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const getColumns = createSelector(
  (state: RootState) => state,
  (state) => state.columns.columns
);
