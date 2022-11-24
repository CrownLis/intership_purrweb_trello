import { RootState } from '../../store';

export const selectColumns = (state: RootState) => {
  return state.columns.columns;
};
