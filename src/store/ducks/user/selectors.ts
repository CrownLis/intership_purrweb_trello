import { State } from '../../../Types/types';

const selectUser = () => {
  return (state: State) => {
    return state.user;
  };
};

export const userSelectors = { selectUser };
