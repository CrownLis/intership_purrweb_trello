import { useContext } from 'react';
import { State } from '../Types/types';
import StoreContext from './StoreContext';

type Cb<T = any> = (state: State) => T;

function useSelector<T = any>(cb: Cb<T>) {
  const state = useContext(StoreContext);
  return cb(state);
}

export default useSelector;
