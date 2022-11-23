import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const selectorGetUser = createSelector(
  (state: RootState) => state,
  (state) => state.user.user
);
