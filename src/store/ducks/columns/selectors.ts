import { State } from '../../../Types/types';

const selectColumns = () => {
  return (state: State) => {
    return state.columns;
  };
};

export const columnsSelectors = { selectColumns };
