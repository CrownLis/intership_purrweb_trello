import { RootState } from '../../store';

export const selectorGetColumns = (state: RootState) => {
  return state.columns.columns;
};
